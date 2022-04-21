import React from 'react';
import {useNavigate} from 'react-router-dom'

const RootButton = () => {

    const goTo = useNavigate()

    return(
        <button onClick={() => goTo('/')}>Back To Start</button>
    )
}

export default RootButton
