import React from 'react';
import './style.css';

const LoggedIn = () => {

    //can uncomment code below to retireve username once log-in has been set-up

    // const user = JSON.parse(window.localStorage.getItem('user'));
    // const username = user.username
    
    return (
        <section>
            <h2>Hi {username} you have successfully logged in!</h2>

        </section>
    )
}

export default LoggedIn;


