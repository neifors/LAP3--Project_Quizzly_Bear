import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const gotTo = useNavigate()

    const logout = () => {
        localStorage.clear()
        gotTo('/')
    }
    
    return(
        <button id='logout-button' onClick={() => logout()}>Logout</button>
    )
}

export default Logout;
