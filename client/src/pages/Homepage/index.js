import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'
import StartGame from '../../components/StartGame';

const Homepage = () => {
    const goTo = useNavigate();

    return (
    <section>
    <img src='https://drive.google.com/uc?export=view&id=1ComcFxDbcmO0JLb4NA7sOiEYk8Kfrezp' alt='Quizzly Bears Logo'></img>
    <button onClick={() => {goTo('/login')}}> LOGIN </button>
    <button onClick={() => {goTo('/register')}}> REGISTER </button>
    <p id="guest-play">Play as a guest:</p>
    <StartGame />
    </section>
    )
}

export default Homepage;
