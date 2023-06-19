import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { CartContext } from '../Store/CartContext';
import styles from './Header.module.css'

const Header = ({ toggleCart }) => {
  const { cartCount } = React.useContext(CartContext);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="d-flex justify-content-between">
        <Nav>
          <NavLink exact to="/" activeClassName={styles['active-navlink']}>
            Home
          </NavLink>
          <NavLink to="/about" activeClassName={styles['active-navlink']}>
            About
          </NavLink>
        </Nav>
        <Button variant="primary" onClick={toggleCart}>
          Cart ({cartCount})
        </Button>
      </Navbar>
    </div>
  );
};

export default Header;
