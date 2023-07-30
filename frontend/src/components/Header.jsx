import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import {} from 'react-icons'

const Header = ()=>{
    return (
        <Navbar className="navbar navbar-dark bg-dark">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand href="#home">MERN Authentication</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <LinkContainer to="/login">
                <Navbar.Text>
                    Sign in
                </Navbar.Text>
            </LinkContainer>
            
            &nbsp;&nbsp;&nbsp;
            <LinkContainer to="/register">
                <Navbar.Text>
                    Sign up
                </Navbar.Text>
            </LinkContainer>
            
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header;