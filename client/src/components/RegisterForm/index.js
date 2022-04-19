import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerFunction } from "../../actions";
import './style.css'

function RegisterForm() {

    const goTo = useNavigate();

    const [ username, setUsername ] = useState();
    const [ password, setPassword ] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        registerFunction(e);        
    }

    const updateUsername = e => {
        const input = e.target.value;
        setUsername(input)
    }

    const updatePassword = e => {
        const input = e.target.value;
        setPassword(input)
    }

    return (
        <form aria-label='form' onSubmit={handleSubmit}>
            <label htmlFor='Username'>Username</label>
            <input aria-label="Username" name="username" type='text' onChange={updateUsername} />
            <label htmlFor='Password'>Password</label>
            <input aria-label='Password' name="password" type='password' onChange={updatePassword} />
            <input className='submit' type='submit' value='REGISTER' />
            <p className="clickable" onClick={() => goTo('/login')}>Already have an account? Click here to login!</p>
            </form>
    );
};

export default RegisterForm;
