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
    const jwt_token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const res = await response.json()
    if (response.ok) {
      const {profile_details} = res
      this.setState({profileDetails: profile_details})
    } else {
    }
  }

  getProducts = async () => {
    this.setState({isLoading: true})
    const {searchQuery, activeSalaryRange, activeEmployementType} = this.state
    // console.log(activeSalaryRange)
    const jwt_token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployementType}&minimum_package=${activeSalaryRange}&search=${searchQuery}`
    console.log(apiUrl)
    const response = await fetch(apiUrl, options)
    const res = await response.json()
    if (response.ok) {
      console.log(res.jobs)
      this.setState({renderJobItems: res.jobs, isLoading: false})
    }
  }

  handleSearch = event => {
    this.setState({searchQuery: event.target.value})
  }

  handleRadioChange = id => {
    console.log(`${id} received`)
    this.setState({activeSalaryRange: id}, this.getProducts) //asynchronus setState call after updated salary make request...
  }
  handleEmployement = EmployList => {
    console.log(`${EmployList} .............................hahha`)
    this.setState({activeEmployementType: EmployList}, this.getProducts)
  }

  profileView = () => {
    const {profileDetails} = this.state
    const {name, profile_image_url, short_bio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profile_image_url} className="" alt="" />
        <h1 className="profileHeader">{name}</h1>
        <p className="profileDescription">{short_bio}</p>
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
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.getProducts}
          >
            <BsSearch className="search-icon" />
          </button>
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
