import Cookies from 'js-cookie'

import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="main-page">
        <div className="text">
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millons of people searching for jobs,salary information,company
            reviews. Find the Job that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button">Find Jobs</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
