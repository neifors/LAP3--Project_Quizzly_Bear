import React, { useState } from "react";
import './style.css'

function LoginForm() {

    const [ username, setUsername ] = useState();
    const [ password, setPassword ] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        console.log({"username": username, "password": password})
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
            <input aria-label="Username" type='text' onChange={updateUsername} />
            <label htmlFor='Password'>Password</label>
            <input aria-label='Password' type='password' onChange={updatePassword} />
            <input id='submit' type='submit' value='LOGIN' />
            </form>
    );
};

export default LoginForm;
