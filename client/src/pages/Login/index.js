import React, { useEffect } from 'react';
import { BackButton, LoginForm } from '../../components';
import './style.css'

const Login = () => {

    useEffect(() => {
        localStorage.clear()
    }, [])
    
    return (
    <section>
    <h1>This is the page for the Login!</h1>

    <LoginForm />
    <BackButton />
    </section>
    )
}

export default Login;
