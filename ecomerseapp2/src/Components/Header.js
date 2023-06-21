
import React,{useContext} from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../Store1/CartContext';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleCart }) => {
  const { cartCount } = useContext(CartContext);
  const homeMatch = useMatch('/');
  const storeMatch = useMatch('/store');
  const aboutMatch = useMatch('/about');
  const contactMatch = useMatch('/contact'); 

  const homePath = useResolvedPath('/');
  const storePath = useResolvedPath('/store');
  const aboutPath = useResolvedPath('/about');
  const contactPath = useResolvedPath('/contact'); 

  return (
    <header>
      <nav className='navbar'>
        <ul className='nav-links'>
          <li>
            <Link to={homePath} className={homeMatch ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to={storePath} className={storeMatch ? 'active' : ''}>
              Store
            </Link>
          </li>
          <li>
            <Link to={aboutPath} className={aboutMatch ? 'active' : ''}>
              About
            </Link>
          </li>
          <li> 
            <Link to={contactPath} className={contactMatch ? 'active' : ''}>
              Contact
            </Link>
          </li>
        </ul>
        <Button variant="primary" onClick={toggleCart}>
          Cart ({cartCount})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
