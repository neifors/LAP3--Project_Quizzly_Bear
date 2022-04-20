import React from 'react';
import {useNavigate} from 'react-router-dom'

const HomeButton = () => {

    const goTo = useNavigate()

    return(
        <button onClick={() => goTo('/welcome')}>Back to Homepage</button>
    )
}

export default HomeButton
