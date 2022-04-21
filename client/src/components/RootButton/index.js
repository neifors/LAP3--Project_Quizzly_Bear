import React from 'react';
import {useNavigate} from 'react-router-dom'

const HomeButton = () => {

    const goTo = useNavigate()

    return(
        <button onClick={() => goTo('/')}>Back To Start</button>
    )
}

export default HomeButton
