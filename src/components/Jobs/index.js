import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobItems from '../JobItems'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  state = {
    userInputText: '',
    jobsList: [],
    filteredJobs: [],
    status: 'progress',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsList: formattedData,
        filteredJobs: formattedData,
        status: 'success',
      })
    } else {
      this.setState({status: 'failure'})
    }
  }

  updateSearch = e => {
    const {jobsList} = this.state
    const userInputText = e.target.value.toLowerCase()
    this.setState({userInputText})

    const searchedJobs = jobsList.filter(each =>
      each.title.toLowerCase().includes(userInputText),
    )
    this.setState({
      filteredJobs: searchedJobs,
      status: searchedJobs.length === 0 ? 'noJobs' : 'success',
    })
  }

  renderContent = () => {
    const {filteredJobs, status} = this.state

    switch (status) {
      case 'progress':
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'failure':
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
          </div>
        )
      case 'success':
        return (
          <div>
            <ul className="list">
              {filteredJobs.map(each => (
                <JobItems jobsList={each} key={each.id} />
              ))}
            </ul>
          </div>
        )
      case 'noJobs':
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="jobs">
          <div className="profile-filters">
            <div className="profile">
              <img
                src="https://assets.ccbp.in/frontend/react-js/male-avatar-img.png"
                alt="avatar"
              />
              <h4>Rahul Attluri</h4>
              <p>Lead Software Developer and AI-ML Expert</p>
            </div>
            <hr />
            <div className="filters">
              <h4>Types of Employment</h4>
              <label>
                <input type="checkbox" value="fullTime" /> Full Time
              </label>
              <label>
                <input type="checkbox" value="partTime" /> Part Time
              </label>
              <label>
                <input type="checkbox" value="freeLance" /> Freelance
              </label>
              <label>
                <input type="checkbox" value="internship" /> Internship
              </label>
            </div>
            <hr />
            <div className="filters">
              <h4>Salary Range</h4>
              <label>
                <input type="checkbox" value="10lpa" /> 10 LPA and above
              </label>
              <label>
                <input type="checkbox" value="20lpa" /> 20 LPA and above
              </label>
              <label>
                <input type="checkbox" value="30lpa" /> 30 LPA and above
              </label>
              <label>
                <input type="checkbox" value="40lpa" /> 40 LPA and above
              </label>
            </div>
          </div>

          <div className="jobs-list">
            <div className="search">
              <input
                type="search"
                className="search-bar"
                onChange={this.updateSearch}
              />

              <BsSearch className="search-icon" />
            </div>
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
