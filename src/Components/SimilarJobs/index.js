import {FaStar} from 'react-icons/fa'
import {FaLocationDot} from 'react-icons/fa6'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = job
  return (
    <li className="">
      <div className="">
        <img src={companyLogoUrl} alt="" className="" />
        <div className="">
          <h1>{title}</h1>
          <div className="">
            <FaStar />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="">
        <FaLocationDot />
        <p>{location}</p>
        <BsFillBriefcaseFill />
        <p>{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobs
