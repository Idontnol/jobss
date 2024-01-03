import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  handleUsername = event => {
    this.setState({username: event.target.value})
  }

  handlePassword = event => {
    this.setState({password: event.target.value})
  }

  successView = jwtToken => {
    const {history} = this.props
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 20})
    history.replace('/')
  }

  failureView = errorMesg => {
    console.log(`error ${errorMesg}`)
    this.setState({errorMsg: errorMesg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails)
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.successView(data.jwt_token)
    }
    if (!response.ok) {
      this.failureView(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state

    return (
      <div className="login-container">
        <form onSubmit={this.submitForm} className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="login-logo"
          />
          <label htmlFor="userName" className="label-class">
            USERNAME
          </label>
          <input
            type="text"
            id="userName"
            value={username}
            onChange={this.handleUsername}
            className="input-class"
            placeholder="Username"
          />
          <label htmlFor="passWord" className="label-class">
            PASSWORD
          </label>
          <input
            type="password"
            id="passWord"
            className="input-class"
            value={password}
            onChange={this.handlePassword}
            placeholder="Password"
          />
          {errorMsg ? <p className="error">*{errorMsg}</p> : null}
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
