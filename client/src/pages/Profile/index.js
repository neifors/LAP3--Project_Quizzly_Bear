import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode'
import { getLeaderboardData } from '../../actions';
import { LeaderboardButton, Logout, StartGame } from '../../components';
import './style.css'
import DeleteButton from '../../components/DeleteButton';
import HomeButton from '../../components/HomeButton';

const Profile = () => {

    const [data, setData] = useState()

    useEffect(() => {
        async function getData () {
            const data = await getLeaderboardData();
            setData(data)
        }
        getData()
    }, [])

    const userInfo = localStorage.getItem('token')
    const username = jwt(userInfo).username
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);
    const userData = data && data.find(x => x.username == `${username}`)
    const score = userData && userData.score
    return (
        <section className='profile'>
            <img src='https://drive.google.com/uc?export=view&id=1or22FAHZtztxmNLSqAlZetPPLhsrX702' alt='Icon' />
            <h1>Welcome back {displayName}!</h1>
            <h2>Your Score: {score} { score==0 ? "":"Great Job!"}</h2>
            <LeaderboardButton />
            <StartGame />
            <HomeButton />
            <Logout />
            <DeleteButton username={username} />
        </section>
    )

}

export default Profile;
