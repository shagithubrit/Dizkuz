import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import './Components.css';

function NavBar() {
  const navigate = useNavigate();
  const logout = async() => {
    await localStorage.removeItem( 'currentUser');
    navigate( '/landing');
  }


  return (
    <div className='NavBarC'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Dizkuz</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Profile</Nav.Link>
            <Nav.Link href="/organisations">Organisations</Nav.Link>
            <Nav.Link href="/about-us">About Us</Nav.Link>
            <Nav.Link onClick={logout}>Log out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;