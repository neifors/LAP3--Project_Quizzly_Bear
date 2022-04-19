import React from 'react';
import {useNavigate} from 'react-router-dom'

const LeaderboardButton = () => {

    const goTo = useNavigate()

    return(
        <button onClick={() => goTo('/leaderboard')}>See Leaderboard</button>
    )
}

export default LeaderboardButton
