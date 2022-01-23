import React, { useState } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SellerSignUpService } from '../../../service/SellerService';

const SellerSignUp = () => {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("seller");
    const [gstNo,setGstNo] = useState("")
    const [checkSubmit, setCheckSubmit] = useState(false) 
    const navigate = useNavigate();
    
    const submitHandler = (e)=>{
        e.preventDefault();
        setCheckSubmit(true)
        const data = {firstName:firstName,lastName:lastName,email:email,password:password,role:role,gstNo:gstNo};
        // console.log(data);
        SellerSignUpService(data)
        .then((response)=>{
            if(response.status===200){
                // console.log(response)
                // console.log(typeof(response.data))
                setCheckSubmit(false)
                if(response.data.includes("user already have account")){
                    toast.info(" you already have account please login ")
                    navigate('/sellerlogin')    
                }
                else{
                    toast.success("seller account created successfully please Login")
                    navigate('/sellerlogin')
                }}           
            console.log(response);
        })
        .catch((e)=>{
            console.log(e);
            toast.error("error occured Account Not created");
            setCheckSubmit(false)
        })
    }

    return (
        <div className="container-fluid" style={{margin: "auto",width: "60%", padding: "10px",textAlign:"Left"}}>
            <h1 className='mb-3 mt-3'>Seller SignUp Form</h1>
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

                <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
                    <Form.Label>GstNo</Form.Label>
                    <Form.Control type="text" required placeholder="Enter gstNo" value={gstNo} onChange={(e)=>setGstNo(e.target.value)} isInvalid={gstNo.length<15||gstNo.length>15}/>
                    <Form.Control.Feedback type="invalid">
                        Please enter valid gstNo.
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" required label="Agree to terms and condition"/>
                </Form.Group>

                <Button className="d-grid gap-2 col-6 mx-auto" variant="primary" type="submit"disabled={checkSubmit}>
                   {checkSubmit?"submitting": "Submit"}
                </Button>
            </Form>
        </div>
    )
};

export default SellerSignUp;
