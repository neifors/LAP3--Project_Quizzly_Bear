import React from 'react';
import { LeaderboardButton, Logout, StartGame } from '../../components';
import jwt from 'jwt-decode'
import './style.css';
import ProfileButton from '../../components/ProfileButton';

const Welcome = () => {

    const userInfo = localStorage.getItem('token')
    const username = jwt(userInfo).username
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);
    
    return (
        <>
            <section>
                <img src='https://drive.google.com/uc?export=view&id=1ComcFxDbcmO0JLb4NA7sOiEYk8Kfrezp' alt='Quizzly Bears Logo'></img>
                <h2>Welcome {displayName}!</h2>

                <StartGame/>
                <ProfileButton />
                <LeaderboardButton/>
                <Logout/>

            </section>
        </>
    )
}

export default Welcome;


