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
    const jwt_token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
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
      const {job_details, similar_jobs} = res
      console.log(`${job_details} job details .....`)
      const {skills} = job_details
      console.log(`${similar_jobs} similarjobs...................`)
      this.setState({
        similarJobs: similar_jobs,
        skillsView: skills,
        jobDetails: job_details,
        show: true,
      })
    } else {
      this.setState({show: false})
    }
  }

  render() {
    const {jobDetails, skillsView, similarJobs, show} = this.state
    const {
      company_logo_url,
      company_website_url,
      life_at_company,
      employment_type,
      id,
      job_description,
      location,
      package_per_annum,
      rating,
      title,
    } = jobDetails
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
                <img src={company_logo_url} alt="" className="" />
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
                <p>{employment_type}</p>
                <p className="package">{package_per_annum}</p>
              </div>
              <hr />
              <div className="">
                <h1>Description</h1>
                <a href={company_website_url} className="">
                  Visit <FaExternalLinkAlt />
                </a>
              </div>
              <p>{job_description}</p>
              <h1>Skills</h1>
              <div className="">
                {skillsView.map(each => (
                  <div className="">
                    <img src={each.image_url} />
                    <p>{each.name}</p>
                  </div>
                ))}
              </div>
              <h1>Life At Company</h1>
              <div>
                <p>{life_at_company?.description}</p>
                <img src={life_at_company.image_url} alt="" className="" />
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
