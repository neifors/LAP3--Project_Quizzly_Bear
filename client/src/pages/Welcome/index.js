import React from 'react';
import { LeaderboardButton, Logout, StartGame } from '../../components';
import './style.css';

const Welcome = () => {

    //can uncomment code below to retireve username once log-in has been set-up

    // const user = JSON.parse(window.localStorage.getItem('user'));
    // const username = user.username
    
    return (
        <>
            <section>
                <h2>Welcome 
                    {/* {username}  */}
                    !</h2>

                <StartGame/>
                <LeaderboardButton/>
                <Logout/>

            </section>
        </>
    )
}

export default Welcome;


