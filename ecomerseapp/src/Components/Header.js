import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { CartContext } from '../Store/CartContext';

const Header = ({ toggleCart }) => {
  const { cartCount } = useContext(CartContext);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="d-flex justify-content-between">
        <Nav>
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Store</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
        </Nav>
        <Button variant="primary" onClick={toggleCart}>
          Cart ({cartCount})
        </Button>
      </Navbar>
    </div>
  );
};

export default Header;
