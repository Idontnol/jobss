import {Link} from 'react-router-dom'
import {FaLocationDot} from 'react-icons/fa6'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {job} = props
  const {
    company_logo_url,
    employment_type,
    id,
    job_description,
    location,
    package_per_annum,
    rating,
    title,
  } = job
  console.log(job.title, job.location)
  return (
    <Link to={`/jobs/${id}`} className="linkDec">
      <li className="jobItemContainer toDown">
        <div className="toRight">
          <img src={company_logo_url} alt="" className="company_logo" />
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
        <h1>Description</h1>
        <p>{job_description}</p>
      </li>
    </Link>
  )
}

export default JobItem
