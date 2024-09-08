import {Component} from 'react'

import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: '',
    showError: false,
  }

  updateUsername = event => {
    const {username} = this.state
    this.setState({username: event.target.value})
    console.log(username)
  }

  updatePassword = event => {
    const {password} = this.state
    this.setState({password: event.target.value})
    console.log(password)
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmission = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({showError: false})
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({error: data.error_msg, showError: true})
    }
  }

  render() {
    const {showError, error} = this.state
    return (
      <div className="login-module">
        <div className="login">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.onSubmission} className="form">
            <label>
              <p className="label">Username</p>
              <input
                type="text"
                onChange={this.updateUsername}
                className="input-"
              />
            </label>
            <label>
              <p className="label">Password</p>
              <input
                type="password"
                onChange={this.updatePassword}
                className="input-"
              />
            </label>
            <div className="btn">
              <button type="submit">Login</button>
            </div>
            {showError && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
