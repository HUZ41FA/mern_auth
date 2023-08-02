import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/usersAPISlice";

const Register = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state=>state.auth).userInfo;
    const [updateUser, {isLoading}] = useUpdateUserMutation();

    React.useEffect(()=>{
        setFormData(prevFormData=>{
            return {
                ...prevFormData,
                name: userInfo.name,
                email: userInfo.email
            }
        })
    }, [userInfo.name, userInfo.email])


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
        try{
            const res = await updateUser({_id:userInfo._id, name:formData.name, email:formData.email}).unwrap();
            dispatch(setCredentials({...res}));
            toast.success("Profile Updated!");
        }catch(error){
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <>
            <FormContainer>
                <h1>
                   Your Profile
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
                    <Button 
                        type='submit'
                        variant='primary'
                        className='mt-4 w-100'
                        >
                            {
                                isLoading ?
                                <Loader/>
                                :
                                "Update"
                            }
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default Register;