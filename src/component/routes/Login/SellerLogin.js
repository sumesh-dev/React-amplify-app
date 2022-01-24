import {React,useState,useContext} from 'react';
import {Form, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IsSignedIn,User } from '../../../context/Context';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { AuthenticatedSellerService, SellerSignInService } from '../../../service/SellerService';

const SellerLogin = () => {
  
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
        SellerSignInService(data)
        .then((response)=>{
            // console.log(response.data.JwtToken)
            if(response.status===200&&response.data.JwtToken){
                // sessionStorage.setItem("seller",response.data.JwtToken)
                Cookies.set('SJwtToken',response.data.JwtToken,{expires:5*60*60*1000})
                AuthenticatedSellerService()
                .then((response)=>{
                    // toast.success("login successfully")
                    console.log(response)
                    setUser(response.data);
                    setIsSignedIn(true);                    
                    navigate('/myProducts')
                })
                .catch((e)=>{
                    toast.error("error occured at server side")
                setCheckSubmit(true);
                console.log(e)
                })
                console.log(response);
                setCheckSubmit(true)
            }
            if(response.status===400){
                toast.warn(" wrong credentials ")
                setCheckSubmit(true)
                console.log(e)
                navigate('/sellerlogin')
            }
            // console.log(response)
        })
        .catch((err)=>{
            console.log(err);
            toast.warn("error occured at server side")
            setCheckSubmit(true);
        })
    }

    return (
        <div className = "container-fluid" style={{margin: "auto",width: "50%", padding: "10px",textAlign:"Left"}}>
            <h1>Seller Sign In</h1>
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
            <h4 className='mt-3 text-center'>Don't have seller account <Link className="link-primary" to ="/sellersignup">Register Now</Link></h4>
        </div>
    );
};

export default SellerLogin;
