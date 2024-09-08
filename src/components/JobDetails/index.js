import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsStarFill, BsGeoAlt} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

class JobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        const formattedData = {
          companyLogoUrl: data.job_details.company_logo_url,
          title: data.job_details.title,
          rating: data.job_details.rating,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          employmentType: data.job_details.employment_type,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(skill => ({
            name: skill.name,
            imageUrl: skill.image_url,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
        }

        const similarJobsFormatted = data.similar_jobs.map(job => ({
          id: job.id,
          companyLogoUrl: job.company_logo_url,
          title: job.title,
          rating: job.rating,
          location: job.location,
          employmentType: job.employment_type,
          jobDescription: job.job_description,
        }))

        this.setState({
          jobDetails: formattedData,
          similarJobs: similarJobsFormatted,
        })
      } else {
        console.error('Failed to fetch job details:', data.error_msg)
      }
    } catch (error) {
      console.error('Error fetching job details:', error)
    }
  }

  render() {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      packagePerAnnum,
      employmentType,
      jobDescription,
      skills = [],
      lifeAtCompany = {},
    } = jobDetails

    return (
      <div>
        <Header />
        <div className="job">
          <div className="logo-details">
            <div className="company-logo">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="logo-style"
              />
            </div>
            <div className="job-title-rating">
              <h2 className="job-title">{title}</h2>
              <div className="rating">
                <BsStarFill className="star-icon" /> {/* Star icon */}
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employment">
            <div className="location">
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
          <h1 className="description-title">Description</h1>
          <p className="job-description">{jobDescription}</p>

          {/* Display Skills */}
          <h2 className="skills-title">Skills</h2>
          <div className="skills">
            <ul className="skills-list">
              {skills.map(skill => (
                <li key={skill.name} className="skill-item">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="skill-img"
                  />
                  <p>{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="life-at-company-title">Life at Company</h2>
          <div className="life-at-company">
            <p>{lifeAtCompany?.description}</p>
            <img
              src={lifeAtCompany?.imageUrl}
              alt="company life"
              className="life-at-company-img"
            />
          </div>
          <h2 className="similar-jobs-title">Similar Jobs</h2>
          <h2 className="similar-jobs-title">Similar Jobs</h2>
          <div className="similar-jobs">
            {similarJobs.map(job => (
              <div key={job.id} className="similar-job-card">
                <div className="similar-job-header">
                  <img
                    src={job.companyLogoUrl}
                    alt="similar job company logo"
                    className="similar-job-logo"
                  />
                  <div>
                    <h1 className="similar-job-title">{job.title}</h1>
                    <div className="similar-job-rating">
                      <BsStarFill className="star-icon" />
                      <p>{job.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="similar-job-info">
                  <div className="similar-job-location">
                    <BsGeoAlt className="location-icon" />
                    <p>{job.location}</p>
                  </div>
                  <p className="similar-job-employment-type">
                    {job.employmentType}
                  </p>
                </div>
                <p className="similar-job-description">{job.jobDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default JobDetails
