import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-page">
      <nav className="navigation">
        <div>
          <Link to="/" className="links">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </div>
        <div>
          <Link to="/" className="links">
            Home
          </Link>
          <Link to="/jobs" className="links">
            jobs
          </Link>
        </div>
        <div>
          <button type="button" onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}
export default withRouter(Header)
