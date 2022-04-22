import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFunction, registerFunction } from "../../actions";
import './style.css'

function RegisterForm() {

    const goTo = useNavigate();

    const [errorMessage, setErrorMessage] = useState();
    const [ username, setUsername ] = useState();
    const [ password, setPassword ] = useState();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrorMessage('')
        await registerFunction(e);
        await loginFunction(e);
        if(localStorage.length){goTo('/welcome')}
        else { setErrorMessage('User already exists!') }        
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
             {errorMessage && (
                <p className="error"> {errorMessage} </p>
            )}
            <label htmlFor='Username'>Username</label>
            <input aria-label="Username" name="username" type='text' onChange={updateUsername} />
            <label htmlFor='Password'>Password</label>
            <input aria-label='Password' name="password" type='password' onChange={updatePassword} />
            <input role='submit' className='submit' type='submit' value='REGISTER' />
            <p role="msg" className="clickable" onClick={() => goTo('/login')}>Already have an account? Click here to login!</p>
            </form>
    );
};

export default RegisterForm;
