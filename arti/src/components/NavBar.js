import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ImageGen">ImageAI</Link>
        </li>
        <li>
          <Link to="/PortraitGen">PortraitAI</Link>
        </li>
        <li>
          <Link to="/MyBoards">My Boards</Link>
        </li>
        <li>
            <div className="profile-dropdown">
            <Link to="/MyProfile">My Profile</Link>
            <ul className="dropdown-menu">
            <li><Link to="/editprofile">Edit Profile</Link></li>
            <li><Link to="/settings">Settings & Privacy</Link></li>
            <li><Link to="/help">Help and Support</Link></li>
            <li><Link to="/display">Display</Link></li>
            <li><Link to="/">Logout</Link></li>
            </ul>
            </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;