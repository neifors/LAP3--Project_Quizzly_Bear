import React from 'react';
import {useNavigate} from 'react-router-dom'

const StartGame = () => {

    const goTo = useNavigate()

    return(
        <button onClick={() => goTo('/game')}>Start A Game</button>
    )
}

export default StartGame
