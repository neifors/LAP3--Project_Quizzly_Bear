import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode'
import { getLeaderboardData } from '../../actions';
import { LeaderboardButton, Logout, StartGame } from '../../components';
import './style.css'
import DeleteButton from '../../components/DeleteButton';
import HomeButton from '../../components/HomeButton';
import { PointsBar } from '../../components';

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

    let percentage
    let color
    let level
    let num

    if( score < 20){
        percentage = Math.floor((score*100)/20);
        color = "orange"
        level = "Baby Bear"
        num = 1
    } else if( score >= 20 && score < 50){
        percentage =  Math.floor(((score-20)*100)/30);
        color = "blue"
        level = "Young Bear"
        num=2
    } else if( score >= 50 && score < 100){
        percentage = Math.floor(((score-50)*100)/50);
        color = "green"
        level = "Teen Bear"
        num = 3
    } else if( score >= 100 && score < 160){
        percentage =  Math.floor(((score-100)*100)/60);
        color = "red"
        level = "Adult Bear"
        num = 4
    } else if( score >= 160 && score < 250){
        percentage =  Math.floor(((score-160)*100)/90);
        color = "brown"
        level = "Grandpa Bear"
        num = 5
    } else {
        percentage = 100;
        color = "brown"
        level = "The wisest Grandpa Bear"
        num = 5
    }

    return (
        <section className='profile'>

            <img src='https://drive.google.com/uc?export=view&id=1or22FAHZtztxmNLSqAlZetPPLhsrX702' alt='Icon' />
            <h1>Welcome back {displayName}!</h1>
            <h2>Your Score: {score} { score < 10 ? "":"Great Job!"}</h2>
            <p>Level {num}: <strong>{level}</strong></p>

            <PointsBar bgcolor={color} progress={percentage}  height={{percentage}}/>
            <LeaderboardButton />
            <StartGame />
            <HomeButton />
            <Logout />
            <DeleteButton username={username} />
        </section>
    )

}

export default Profile;
