import React, { useState } from 'react';
import { IsSignedIn, User} from './Context';

const Context = ({ children }) => {

    const [user, setUser] = useState([]);
    const [isSignedIn,setIsSignedIn] = useState(false);
    // const [showAlert,setShowAlert] = useState(false);
    
    return (
        <IsSignedIn.Provider value = {{isSignedIn,setIsSignedIn}}>
            <User.Provider value = {{user,setUser}}>
                {/* <ShowAlert.Provider value ={{showAlert,setShowAlert}}> */}
                    {children}
                {/* </ShowAlert.Provider> */}
            </User.Provider>
        </IsSignedIn.Provider>
    )
}

export default Context
