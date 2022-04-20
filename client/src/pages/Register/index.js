import React, {useEffect} from 'react';
import { BackButton, RegisterForm } from '../../components';

const Register = () =>  {
    
    useEffect(() => {
        localStorage.clear()
    }, [])

    return (
    <section>
    <img src='https://drive.google.com/uc?export=view&id=1ComcFxDbcmO0JLb4NA7sOiEYk8Kfrezp' alt='Quizzly Bears Logo'></img>
    <h1>Register</h1>

    <RegisterForm />
    <BackButton />
    </section>
    )

}

export default Register;
