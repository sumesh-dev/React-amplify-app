import React, { useState } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {BuyerLogin, BuyerSignUp} from '../../../service/buyerService'

const SignUp = () => {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("customer");
    const [checkSubmit, setCheckSubmit] = useState(false) 
    const navigate = useNavigate();
    
    const submitHandler = (e)=>{
        e.preventDefault();
        setCheckSubmit(true)
        setRole("customer")
        const data = {firstName:firstName,lastName:lastName,email:email,password:password,role:role};
        // console.log(data);
        BuyerSignUp(data)
        .then((response)=>{
            if(response.status===200){
                // console.log(response)
                // console.log(typeof(response.data))
                if(response.data.includes("user already have account")){
                    toast.info(" you already have account please login ")
                    // reactDom.render(<AlertMsg msg=" you already have account please login" show="true"/>, document.getElementById('error'))
                    navigate('/login')    
                }
                else{
                    toast.success("Account created sucessfully please Login")
                // reactDom.render(<AlertMsg msg=" user sucessfully created please Login" show="true"/>, document.getElementById('error'))
                navigate('/login')
                }   
            }
                
            console.log(response);
        })
        .catch((e)=>{
            console.log(e);
            toast.error("error occured Account Not created");
            // reactDom.render(<AlertMsg msg="error occured Account Not created" />, document.getElementById('error'))
            // return navigate('/')
        })
    }

    return (
        <div className="container-fluid" style={{margin: "auto",width: "60%", padding: "10px",textAlign:"Left"}}>
            <h1 className='mb-3 mt-3'>SignUp Form</h1>
            <Form onSubmit={submitHandler}>
                <Row className="mb-3 align-items-center">
                    <Form.Group as={Col}sm={6} controlId="formGridEmail" className="mt-3" style={{height: "fit-content"}}>
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control type="text" required placeholder="Enter First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col}sm={6} controlId="formGridPassword" className="mt-3">
                        <Form.Label>LastName</Form.Label>
                        <Form.Control type="text" required placeholder="Enter Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                    </Form.Group>
                </Row>

                <Form.Group as={Col}sm="auto" className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" required label="Agree to terms and condition"/>
                </Form.Group>

                <Button className="d-grid gap-2 col-6 mx-auto" variant="primary" type="submit">
                   {checkSubmit?"submitting": "Submit"}
                </Button>
            </Form>
        </div>
    )
}

export default SignUp;