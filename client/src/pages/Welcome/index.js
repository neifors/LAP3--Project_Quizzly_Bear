import React from 'react';
import { LeaderboardButton, Logout, StartGame } from '../../components';
import './style.css';

const Welcome = () => {

    const username = localStorage.getItem('username')
    const dislpayName = username.charAt(0).toUpperCase() + username.slice(1);
    
    return (
        <>
            <section>
                <h2>Welcome {dislpayName}!</h2>

                <StartGame/>
                <LeaderboardButton/>
                <Logout/>

            </section>
        </>
    )
}

export default Welcome;


