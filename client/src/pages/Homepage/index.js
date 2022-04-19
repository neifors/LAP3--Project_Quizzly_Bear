import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

const Homepage = () => {
    const goTo = useNavigate();

    return (
    <section>
    <img src='/images/QUIZZLY BEARS no background.png' alt='Quizzly Bears Logo'></img>
    <button onClick={() => {goTo('/login')}}> LOGIN </button>
    <button onClick={() => {goTo('/login')}}> REGISTER </button>
    </section>
    )
}

export default Homepage;
