import React from 'react';
import {useNavigate} from 'react-router-dom'

const ProfileButton = () => {

    const goTo = useNavigate()

    return(
        <button onClick={() => goTo('/profile')}>See Your Profile!</button>
    )
}

export default ProfileButton
