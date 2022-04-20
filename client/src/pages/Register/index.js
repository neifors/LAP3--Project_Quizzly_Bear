import React, {useEffect} from 'react';
import { BackButton, RegisterForm } from '../../components';

const Register = () =>  {
    
    useEffect(() => {
        localStorage.clear()
    }, [])

    return (
    <section>
    <img src='/images/QUIZZLY_BEARS_no_background.png' alt='Quizzly Bears Logo'></img>
    <h1>Register</h1>

    <RegisterForm />
    <BackButton />
    </section>
    )

}

export default Register;
