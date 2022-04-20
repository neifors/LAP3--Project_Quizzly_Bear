import React, { useEffect } from 'react';
import { BackButton, LoginForm } from '../../components';
import './style.css'

const Login = () => {

    useEffect(() => {
        localStorage.clear()
    }, [])
    
    return (
    <section>
    <img src='/images/QUIZZLY_BEARS_no_background.png' alt='Quizzly Bears Logo'></img>
    <h1>Login</h1>

    <LoginForm />
    <BackButton />
    </section>
    )
}

export default Login;
