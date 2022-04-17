import React, { useState } from "react";

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
            <input aria-label="Username" type='text' onChange={updateUsername} />
            <input aria-label='Password' type='password' onChange={updatePassword} />
            <input type='submit' value='Login' />
            </form>
    );
};

export default LoginForm;
