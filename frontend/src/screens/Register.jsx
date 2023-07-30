import React from "react";
import { Link } from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from "../components/FormContainer";

const Register = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

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
    }

    return (
        <>
            <FormContainer>
                <h1>
                   Sign Up 
                </h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='name' className="mt-3">
                        <Form.Label><b>Name</b></Form.Label>
                        <Form.Control
                            type="name"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleTextFieldChange}
                        ></Form.Control>
                    </Form.Group>

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

                    <Form.Group controlId='confirmPassword' className="mt-3">
                        <Form.Label><b>Confirm Password</b></Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Re-Enter Password"
                            value={formData.confirmPassword}
                            onChange={handleTextFieldChange}
                        ></Form.Control>
                    </Form.Group>

                    <Button 
                        type='submit'
                        variant='primary'
                        className='mt-3'
                        >
                            Register
                    </Button>

                    <Row className='py-3'>
                        <Col>
                            Already have an account? <Link to='/login'>Login</Link>
                        </Col>
                    </Row>
                    
                </Form>
            </FormContainer>
        </>
    )
}


export default Register;