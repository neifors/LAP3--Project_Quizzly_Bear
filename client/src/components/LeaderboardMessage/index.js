import React from 'react';

const LeaderboardMessage = ({leader, secondPlace, thirdPlace}) => {

    let message = ''

    let currentPlayer = localStorage.getItem('username');

    if (currentPlayer === leader.username){
        message = `Congratulations ${currentPlayer} you are the Smartest Teddy!`
    }
    else if (currentPlayer === secondPlace.username || currentPlayer === thirdPlace.username){
       message = `Well done ${currentPlayer} you are in the top 3!! A few more points and you could be top of the leaderboard`
    }
    else (message = `Great Work ${currentPlayer}! Keep scoring points to work up the leaderboard`)

    return(
        <p role='message'>{message}</p>
    )

}


export default LeaderboardMessage;
