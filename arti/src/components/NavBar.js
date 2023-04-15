import styles from '../styles/components/navbar.module.css'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ viewportType }) => {
  return (
    <nav
      className={`${styles['nav-bar']} navbar-static-top ${styles[viewportType]}`}
    >
      <ul className={`${styles['nav-links']}`}>
        {/* not needed??? */}
        {/* <li>
          <NavLink
            to='/'
            className={({ isActive, isPending }) =>
              isPending ? styles.pending : isActive ? styles.active : ''
            }
          >
            <div className={`${styles['link-icon']}`}>
              <i className='bi bi-house-fill'></i>
              <p>Home</p>
            </div>
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to='/imagegen'
            className={({ isActive, isPending }) =>
              isPending ? styles.pending : isActive ? styles.active : ''
            }
          >
            <div className={`${styles['link-icon']}`}>
              <i className='bi bi-image-fill'></i>
              <p>ImageAI</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/portraitgen'
            className={({ isActive, isPending }) =>
              isPending ? styles.pending : isActive ? styles.active : ''
            }
          >
            <div className={`${styles['link-icon']}`}>
              <i className='bi bi-person-bounding-box'></i>
              <p>PortraitAI</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/myboards'
            className={({ isActive, isPending }) =>
              isPending ? styles.pending : isActive ? styles.active : ''
            }
          >
            <div className={`${styles['link-icon']}`}>
              <i className='bi bi-columns'></i>
              <p>Boards</p>
            </div>
          </NavLink>
        </li>
        <li>
          <div className='profile-dropdown'>
            <NavLink
              to='/myprofile'
              className={({ isActive, isPending }) =>
                isPending ? styles.pending : isActive ? styles.active : ''
              }
            >
              <div className={`${styles['link-icon']}`}>
                <i className='bi bi-person-lines-fill'></i>
                <p>Profile</p>
              </div>
            </NavLink>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
