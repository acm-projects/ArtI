import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='nav-bar'>
      <ul className='nav-links'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/imagegen'>ImageAI</Link>
        </li>
        <li>
          <Link to='/portraitgen'>PortraitAI</Link>
        </li>
        <li>
          <Link to='/myboards'>My Boards</Link>
        </li>
        <li>
          <div className='profile-dropdown'>
            <Link to='/myprofile'>My Profile</Link>
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
