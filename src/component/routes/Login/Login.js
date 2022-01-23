import {React,useState,useContext} from 'react';
import {Form, Button} from 'react-bootstrap';
import { BuyerLogin } from '../../../service/buyerService';
import { Link, useNavigate } from 'react-router-dom';
import { IsSignedIn,User } from '../../../context/Context';
import reactDom from 'react-dom';
import { UserService } from '../../../service/buyerService';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

const Login = () => {
    const {setIsSignedIn} = useContext(IsSignedIn);
    const {setUser} = useContext(User);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkSubmit, setCheckSubmit] = useState(true);

    const navigate = useNavigate();

    const submitForm = (e)=>{
        e.preventDefault();
        setCheckSubmit(false)
        const data = {email:email,password:password};

        BuyerLogin(data)
        .then((response)=>{
            console.log(response.data.JwtToken)
            if(response.status===200&&response.data.JwtToken){
                Cookies.set('JwtToken',response.data.JwtToken,{expires:5*60*60*1000})
                UserService()
                .then((response)=>{
                    // toast.success("login successfully")
                    console.log(response)
                    setUser(response.data);
                    setIsSignedIn(true);                    
                    navigate('/')
                })
                .catch((e)=>{
                    toast.error("error occured at server side")
                // reactDom.render(<AlertMsg msg="error occured at server side"/>, document.getElementById('error'))
                setCheckSubmit(true);
                console.log(e)
                })
                console.log(response);
                setCheckSubmit(true)
            }
            if(response.status===400){
                toast.warn(" wrong credentials ")
                // <AlertMsg msg=" wrong credentials "/>
                setCheckSubmit(true)
                console.log(e)
                navigate('/login')
            }
            // console.log(response)
        })
        .catch((err)=>{
            console.log(err);
            toast.warn("error occured at server side")
            // reactDom.render(<AlertMsg msg="error occured at server side"/>, document.getElementById('error'))
            setCheckSubmit(true);
        })
    }

    return (
        <div className = "container-fluid" style={{margin: "auto",width: "50%", padding: "10px",textAlign:"Left"}}>
            <h1>Sign In</h1>
            <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" required placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                {checkSubmit?
                <Button className="d-grid gap-2 col-6 mx-auto" variant="primary" type="submit">
                    Submit
                </Button>
                :<Button className="d-grid gap-2 col-6 mx-auto" variant="primary" type="submit" disabled>
                Submiting
            </Button>
                }
            </Form>
            <h4 className='mt-3 text-center'>Don't have account <Link className="link-primary" to ="/signup">Register Now</Link></h4>
            <h5 className='mt-3 text-center'>Seller Account <Link className="link-primary" to ="/sellerlogin">click here</Link></h5>
        </div>
    );
}

export default Login;