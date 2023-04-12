import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Components.css';

function NavBar() {
  return (
    <div className='NavBarC'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dizkuz</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Profile</Nav.Link>
            <Nav.Link href="/features">Organisations</Nav.Link>
            <Nav.Link href="/pricing">About Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;