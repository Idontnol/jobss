import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const handleLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar-header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="header-largeLogo"
          alt=""
        />
      </Link>
      <div className="navbar-largeContainer">
        <ul className="menu">
          <li>
            <Link to="/" className="links">
              {' '}
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="links">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)

// <Link to="/">
//   <img
//     src="https://assets.ccbp.in/frontend/react-js/home-sm-bg.png"
//     className="header-mobilelogo"
//     alt=""
//   />
// </Link>

// <div className="navbar-mobile">
//   <Link to="/">
//     <IoMdHome />
//   </Link>
//   <Link to="/jobs">
//     <BsFillBriefcaseFill />
//   </Link>
//   <MdOutlineLogout className="" onClick={handleLogout} />
// </div>
// import {IoMdHome} from 'react-icons/io'
// import {MdOutlineLogout} from 'react-icons/md'
// import {BsFillBriefcaseFill} from 'react-icons/bs'
