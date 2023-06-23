import React, { useContext } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { CartContext } from '../Store1/CartContext';
import './Header.css';

const Header = ({ toggleCart, user, handleLogout }) => {
  const { cartCount } = useContext(CartContext);
  const homeMatch = useMatch('/');
  const storeMatch = useMatch('/store');
  const aboutMatch = useMatch('/about');
  const contactMatch = useMatch('/contact');
  const loginMatch = useMatch('/login');

  const homePath = useResolvedPath('/');
  const storePath = useResolvedPath('/store');
  const aboutPath = useResolvedPath('/about');
  const contactPath = useResolvedPath('/contact');
  const loginPath = useResolvedPath('/login');

  return (
    <header>
      <nav className="navbar">
        <ul className='nav-links'>
          <li className={homeMatch ? 'active' : ''}>
            <Link to={homePath}>Home</Link>
          </li>
          <li className={storeMatch ? 'active' : ''}>
            <Link to={storePath}>Store</Link>
          </li>
          <li className={aboutMatch ? 'active' : ''}>
            <Link to={aboutPath}>About</Link>
          </li>
          <li className={contactMatch ? 'active' : ''}>
            <Link to={contactPath}>Contact</Link>
          </li>
          {user ? (
            <li>
              <Button onClick={handleLogout}>Logout</Button>
            </li>
          ) : (
            <li className={loginMatch ? 'active' : ''}>
              <Link to={loginPath}>Login</Link>
            </li>
          )}
          <li>
            <Button onClick={toggleCart}>
              Cart <span className="badge">{cartCount}</span>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
