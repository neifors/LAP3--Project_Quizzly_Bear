import React, { useEffect } from 'react';
import { BackButton, LoginForm } from '../../components';
import './style.css'

const Login = () => {

    useEffect(() => {
        localStorage.clear()
    }, [])
    
    return (
    <section>
    <img src='https://drive.google.com/uc?export=view&id=1ComcFxDbcmO0JLb4NA7sOiEYk8Kfrezp' alt='Quizzly Bears Logo'></img>
    <h1>Login</h1>

    <LoginForm />
    <BackButton />
    </section>
    )
}

export default Login;
