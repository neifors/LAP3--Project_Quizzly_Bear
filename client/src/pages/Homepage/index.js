import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

const Homepage = () => {
    const goTo = useNavigate();

    return (
    <section>
    <img src='https://drive.google.com/uc?export=view&id=1ComcFxDbcmO0JLb4NA7sOiEYk8Kfrezp' alt='Quizzly Bears Logo'></img>
    <button onClick={() => {goTo('/login')}}> LOGIN </button>
    <button onClick={() => {goTo('/register')}}> REGISTER </button>
    <button onClick={() => {goTo('/game')}}> DEBUG GAME BUTTON LOL </button>
    </section>
    )
}

export default Homepage;
