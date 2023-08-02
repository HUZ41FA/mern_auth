import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/AuthSlice';
import { useLogoutMutation } from '../slices/usersAPISlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Header = ()=>{
    const userInfo = useSelector(state=>state.auth).userInfo;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall, {isLoading}] = useLogoutMutation();

    const handleLogout = async () => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/")
        }catch(error){
            toast.error(error.data.message || error.error)
        }
    }

    return (
        <Navbar className="navbar navbar-dark bg-dark">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand href="#home">MERN Authentication</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            
            {
                userInfo != null ? 
                <>
                <LinkContainer to="/profile">
                    <Navbar.Text>
                        {userInfo.name}
                    </Navbar.Text>
                </LinkContainer>
                &nbsp; &nbsp; &nbsp;
                    <Navbar.Text onClick={handleLogout}>
                        Log Out
                    </Navbar.Text>
                </>
                :
                <>
                <LinkContainer to="/login">
                    <Navbar.Text>
                        Sign in
                    </Navbar.Text>
                </LinkContainer>
                &nbsp; &nbsp; &nbsp;
                <LinkContainer to="/register">
                    <Navbar.Text>
                        Sign up
                    </Navbar.Text>
                </LinkContainer>
                </>
            }
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header;