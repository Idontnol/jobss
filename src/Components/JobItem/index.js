import {Link} from 'react-router-dom'
import {FaLocationDot} from 'react-icons/fa6'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job
  console.log(job.title, job.location)
  return (
    <Link to={`/jobs/${id}`} className="linkDec">
      <li className="jobItemContainer toDown">
        <div className="toRight">
          <img src={companyLogoUrl} alt="" className="company_logo" />
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
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
