import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ type }) => {
  return (
    <nav className={`nav-bar ${type}`}>
      <ul className='nav-links'>
        <li>
          <Link to='/'>
            <div className='link-icon'>
              <i className='bi bi-house-fill'></i>
              <p>Home</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to='/imagegen'>
            <div className='link-icon'>
              <i className='bi bi-image-fill'></i>
              <p>ImageAI</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to='/portraitgen'>
            <div className='link-icon'>
              <i className='bi bi-person-bounding-box'></i>
              <p>PortraitAI</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to='/myboards'>
            <div className='link-icon'>
              <i className='bi bi-columns'></i>
              <p>Boards</p>
            </div>
          </Link>
        </li>
        <li>
          <div className='profile-dropdown'>
            <Link to='/myprofile'>
              <div className='link-icon'>
                <i className='bi bi-person-lines-fill'></i>
                <p>Profile</p>
              </div>
            </Link>
            <ul className='dropdown-menu'>
              <li>
                <Link to='/editprofile'>Edit Profile</Link>
              </li>
              <li>
                <Link to='/settings'>Settings & Privacy</Link>
              </li>
              <li>
                <Link to='/help'>Help and Support</Link>
              </li>
              <li>
                <Link to='/display'>Display</Link>
              </li>
              <li>
                <Link to='/'>Logout</Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
