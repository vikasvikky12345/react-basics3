import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { CartContext } from '../Store1/CartContext';
import './Header.css';

const Header = ({ toggleCart, user, handleLogout }) => {
  const { cartCount } = useContext(CartContext);
  return (
    <header>
      <nav className="navbar">
        <ul className='nav-links'>
          <li>
            <Link to='/homePath'>Home</Link>
          </li>
          <li>
            <Link to='/storePath'>Store</Link>
          </li>
          <li>
            <Link to='/aboutPath'>About</Link>
          </li>
          <li>
            <Link to='/contactPath'>Contact</Link>
          </li>
          {user ? (
            <>
              <li>
                <Button onClick={handleLogout}>Logout</Button>
              </li>
              <li>
                <Button onClick={toggleCart}>
                  Cart <span className="badge">{cartCount}</span>
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Link to='/loginPath'>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
