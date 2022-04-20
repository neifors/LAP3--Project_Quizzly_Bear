import React from 'react';
import jwt from 'jwt-decode'
import { LeaderboardButton, Logout, StartGame } from '../../components';
import './style.css'
import DeleteButton from '../../components/DeleteButton';
import HomeButton from '../../components/HomeButton';

const Profile = () => {

    const userInfo = localStorage.getItem('token')
    const username = jwt(userInfo).username
    const dislpayName = username.charAt(0).toUpperCase() + username.slice(1);
    const score = 'freaking loads'

    return (
        <section>
            <img src='https://drive.google.com/uc?export=view&id=1or22FAHZtztxmNLSqAlZetPPLhsrX702' alt='Icon' />
            <h1>Welcome back {dislpayName}!</h1>
            <h2>Your Score is currently {score}! Great job! </h2>
            <LeaderboardButton />
            <StartGame />
            <HomeButton />
            <Logout />
            <DeleteButton username={username} />
        </section>
    )

}

export default Profile;
