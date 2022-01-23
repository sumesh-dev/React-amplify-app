import React, { useEffect } from 'react';
import reactDom from 'react-dom';

const NotFound = () => {
    useEffect(()=>{
        // reactDom.render(<><img style={{maxHeight: "500px",  marginLeft: "auto", marginRight: "auto", maxWidth: "70%", objectFit:"cover",display:"block"}} src="./images/pageNotFound404.png"/></>,document.getElementById('root'))
    },[]) 
    return <>
    <img style={{maxHeight: "500px",  marginLeft: "auto", marginRight: "auto", maxWidth: "70%", objectFit:"cover",display:"block"}} src="./images/pageNotFound404.png"/>
    </>
}

export default NotFound;
