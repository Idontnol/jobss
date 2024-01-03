import {FaStar} from 'react-icons/fa'
import {FaLocationDot} from 'react-icons/fa6'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {job} = props
  const {
    company_logo_url,
    employment_type,
    id,
    job_description,
    location,
    rating,
    title,
  } = job
  return (
    <li className="">
      <div className="">
        <img src={company_logo_url} alt="" className="" />
        <div className="">
          <h1>{title}</h1>
          <div className="">
            <FaStar />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{job_description}</p>
      <div className="">
        <FaLocationDot />
        <p>{location}</p>
        <BsFillBriefcaseFill />
        <p>{employment_type}</p>
      </div>
    </li>
  )
}

export default SimilarJobs
