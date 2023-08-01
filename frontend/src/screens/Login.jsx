import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersAPISlice";

const Login = () => {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate();
    const dispath = useDispatch();
    const [login, {isLoading, isError}] = useLoginMutation();
    const {userInfo} = useSelector(state=>state.auth);

    React.useEffect(()=>{
        if(userInfo){
            navigate("/")
        }
    }, [navigate, userInfo])


    const handleTextFieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        try{
            const res = await login({email, password}).unwrap();
            dispath(setCredentials({...res}))
        }catch(error){
            console.error(error)
        }
    }

    return (
        <>
            <FormContainer>
                <h1>
                   Sign In 
                </h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='email' className="mt-3">
                        <Form.Label><b>Email Address</b></Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleTextFieldChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className="mt-3">
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleTextFieldChange}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='mt-3'>Log in</Button>
                    <Row className='py-3'>
                        <Col>
                            New user? <Link to='/register'>register</Link>
                        </Col>
                    </Row>
                    
                </Form>
            </FormContainer>
        </>
    )
}


export default Login;