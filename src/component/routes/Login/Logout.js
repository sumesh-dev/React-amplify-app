import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IsSignedIn, User } from '../../../context/Context';
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(User);
    const {setIsSignedIn} = useContext(IsSignedIn);
    
    const logout = ()=>{
        
            setIsSignedIn(false)
            setUser([]);
            Cookies.remove('JwtToken');
            // toast.success("Logout successfully")
            return navigate('/');
    }

    useEffect(()=>{
        logout();
    },[])
    
    return <></>
}

export default Logout;
