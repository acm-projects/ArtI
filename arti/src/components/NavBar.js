import styles from '../styles/components/navbar.module.css'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ viewportType }) => {
  return (
    <nav
      className={`${styles['nav-bar']} navbar-static-top ${styles[viewportType]}`}
    >
      {/* LOGO */}
      <h1 className={`${styles.logo}`}>
        ART<em>i</em>
      </h1>
      <ul className={`${styles['nav-links']}`}>
        <li>
          <NavLink
            to='/imagegen'
            className={({ isActive, isPending }) =>
              isPending ? styles.pending : isActive ? styles.active : ''
            }
          >
            <div className={`${styles['link-icon']}`}>
              <i className='bi bi-image-fill'></i>
              <p>ImageGen</p>
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
              <p>PortraitGen</p>
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
          <NavLink
            to='/myprofile'
            className={({ isActive, isPending }) =>
              isPending ? styles.pending : isActive ? styles.active : ''
            }
          >
            <div className={`${styles['link-icon']} ${styles['profile-link']}`}>
              {/* <i className='bi bi-person-lines-fill'></i> */}
              <i className='bi bi-person-circle'></i>
              <p>Profile</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
