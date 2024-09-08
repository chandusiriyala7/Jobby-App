import {Link} from 'react-router-dom'
import {BsStarFill, BsGeoAlt} from 'react-icons/bs' // Importing icons for star and location

import './index.css'

const JobItems = props => {
  const {jobsList} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsList

  return (
    <Link to={`/jobs/${id}`} className="job-item">
      <div className="job-header">
        <div className="company-logo">
          <img src={companyLogoUrl} alt="logo" />
        </div>
        <div className="job-title-rating">
          <h1 className="job-title">{title}</h1>
          <div className="rating">
            <BsStarFill className="star-icon" /> {/* Star icon */}
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-info">
        <div className="location-employment">
          <BsGeoAlt className="location-icon" /> {/* Location icon */}
          <p>{location}</p>
        </div>
        <div className="employment-type">
          <p>{employmentType}</p>
        </div>
        <div className="package">
          <p>{packagePerAnnum}</p>
        </div>
      </div>
      <hr className="divider" />
      <h2 className="description-title">Description</h2>
      <p className="job-description">{jobDescription}</p>
    </Link>
  )
}

export default JobItems
