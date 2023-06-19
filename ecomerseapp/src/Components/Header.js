import React from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';

const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="d-flex justify-content-between">
        <Nav>
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Store</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
        </Nav>
        <Button variant="primary">Cart</Button>
      </Navbar>
    </div>
  );
}

export default Header;
