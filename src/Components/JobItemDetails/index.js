import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaLocationDot} from 'react-icons/fa6'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'

import './index.css'
import SimilarJobs from '../SimilarJobs'

class JobItemDetails extends Component {
  state = {similarJobs: [], skillsView: [], jobDetails: {}, show: false}

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    console.log('....................................')
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    console.log(response)
    const res = await response.json()
    console.log(
      `${res} reponse................................................................................................................`,
    )
    if (response.ok) {
      // const {job_details, similar_jobs} = res
      const resJobDetails = res.job_details
      const resSimilarJobs = res.similar_jobs

      console.log(`${resJobDetails} job details .....`)
      const similarJobsList = resSimilarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const {skills} = resJobDetails
      console.log(`${similarJobsList} similarjobs...................`)
      this.setState({
        similarJobs: similarJobsList,
        skillsView: skills,
        jobDetails: resJobDetails,
        show: true,
      })
    } else {
      this.setState({show: false})
    }
  }

  render() {
    const {jobDetails, skillsView, similarJobs, show} = this.state
    const newJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      lifeAtCompany: jobDetails.life_at_company,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
    }
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      lifeAtCompany,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = newJobDetails
    // const {
    //   company_logo_url,
    //   company_website_url,
    //   life_at_company,
    //   employment_type,
    //   id,
    //   job_description,
    //   location,
    //   package_per_annum,
    //   rating,
    //   title,
    // } = jobDetails
    console.log(jobDetails)
    console.log(skillsView)
    console.log(show)
    console.log(similarJobs)
    return (
      <>
        {show ? (
          <>
            <div className="jobItemContainer toDown">
              <div className="toRight">
                <img src={companyLogoUrl} alt="" className="" />
                <div className="toDown">
                  <h1>{title}</h1>
                  <div className="toRight">
                    <img src="" alt="" className="" />
                    <p>{rating}</p>
                  </div>
                </div>
              </div>

              <div className="toRight">
                <FaLocationDot />
                <p>{location}</p>
                <BsFillBriefcaseFill />
                <p>{employmentType}</p>
                <p className="package">{packagePerAnnum}</p>
              </div>
              <hr />
              <div className="">
                <h1>Description</h1>
                <a href={companyWebsiteUrl} className="">
                  Visit <FaExternalLinkAlt />
                </a>
              </div>
              <p>{jobDescription}</p>
              <h1>Skills</h1>
              <div className="">
                {skillsView.map(each => (
                  <div className="">
                    <img src={each.image_url} alt="" />
                    <p>{each.name}</p>
                  </div>
                ))}
              </div>
              <h1>Life At Company</h1>
              <div>
                <p>{lifeAtCompany?.description}</p>
                <img src={lifeAtCompany.image_url} alt="" className="" />
              </div>
            </div>
            <h1>Similar Jobs</h1>
            <ul className="">
              {similarJobs.length > 0 &&
                similarJobs.map(job => <SimilarJobs job={job} id={job.id} />)}
            </ul>
          </>
        ) : (
          <p>error</p>
        )}
      </>
    )
  }
}

export default JobItemDetails
