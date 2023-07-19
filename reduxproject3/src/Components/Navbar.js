import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

function NavBar() {
    const cartProducts = useSelector(state =>state.cart)
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Redux Toolkit</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to='/product' as={Link}>Products</Nav.Link>
            </Nav>
            <Navbar.Toggle/>
            <Nav.Link to='/cart' as={Link}>My Cart {cartProducts.length}</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default NavBar;