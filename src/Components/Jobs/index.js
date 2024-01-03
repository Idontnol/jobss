import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import FilterOptions from '../FilterOptions'
import JobItem from '../JobItem'
import './index.css'

class Jobs extends Component {
  state = {
    searchQuery: '',
    profileDetails: {},
    activeEmployementType: '',
    activeSalaryRange: '',
    renderJobItems: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProfileData()
    this.getProducts()
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const res = await response.json()
    if (response.ok) {
      const newProfileDetails = res.profile_details
      this.setState({profileDetails: newProfileDetails})
    }
  }

  getProducts = async () => {
    this.setState({isLoading: true})
    const {searchQuery, activeSalaryRange, activeEmployementType} = this.state
    // console.log(activeSalaryRange)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployementType}&minimum_package=${activeSalaryRange}&search=${searchQuery}`
    console.log(apiUrl)
    const response = await fetch(apiUrl, options)
    const res = await response.json()
    if (response.ok) {
      console.log(res.jobs)
      const {jobs} = res
      const updatedJobs = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({renderJobItems: updatedJobs, isLoading: false})
    }
  }

  handleSearch = event => {
    this.setState({searchQuery: event.target.value})
  }

  handleRadioChange = id => {
    console.log(`${id} received`)
    this.setState({activeSalaryRange: id}, this.getProducts)
  }

  handleEmployement = EmployList => {
    console.log(`${EmployList} .............................hahha`)
    this.setState({activeEmployementType: EmployList}, this.getProducts)
  }

  profileView = () => {
    const {profileDetails} = this.state
    const updatedProfileDetails = {
      name: profileDetails.name,
      shortBio: profileDetails.short_bio,
      profileImageUrl: profileDetails.profile_image_url,
    }
    const {name, shortBio, profileImageUrl} = updatedProfileDetails
    // const {name, profile_image_url, short_bio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="" alt="" />
        <h1 className="profileHeader">{name}</h1>
        <p className="profileDescription">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {searchQuery, renderJobItems, isLoading} = this.state
    return (
      <div className="job-container">
        {this.profileView()}
        <FilterOptions
          handleRadioChange={this.handleRadioChange}
          handleEmployement={this.handleEmployement}
        />
        <div>
          <input
            type="search"
            className=""
            value={searchQuery}
            onChange={this.handleSearch}
          />

          <BsSearch
            className="search-icon"
            onClick={this.getProducts}
            data-testid="searchButton"
          />
        </div>
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <ul className="allJobs">
            {renderJobItems.map(job => (
              <JobItem job={job} key={job.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Jobs
