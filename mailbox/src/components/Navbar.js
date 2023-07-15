import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/welcome" className="nav-link" activeClassName="active-link">
            Compose
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sent" className="nav-link" activeClassName="active-link">
            Sent
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/inbox" className="nav-link" activeClassName="active-link">
            Inbox
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
