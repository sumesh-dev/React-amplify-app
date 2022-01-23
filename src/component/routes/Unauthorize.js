import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Unauthorize = () => {
    
    const navigate = useNavigate();

    useEffect(()=>{
    // reactDom.render(<AlertMsg msg=" your must be login to access these url"/>,document.getElementById('error'))
    return navigate('/')
    },[])
    
    return <></>

}

export default Unauthorize
