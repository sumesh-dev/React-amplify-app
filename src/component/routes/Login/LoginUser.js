import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginUser = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        toast.warn("your already login, please logout first!!")
    return navigate('/')
    },[])
    
    return <></>

}

export default LoginUser;
