import React from 'react';
import reactDom from 'react-dom'

const ServerError = () => {
    return(
        reactDom.render(<><img style={{maxHeight: "500px",  marginLeft: "auto", marginRight: "auto", maxWidth: "70%", objectFit:"cover",display:"block"}} src="./images/internalServer500.png"/></>,document.getElementById('root'))
    )
}

export default ServerError
