import React, { useEffect, useState } from 'react';
import { getLeaderboardData } from '../../actions';
import { LeaderboardMessage } from '../../components';
import './style.css'
import HomeButton from '../../components/HomeButton';


const Leaderboard = () => {

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [data, setData] = useState(false)

    useEffect(() => {
        async function getData () {
            const data = await getLeaderboardData();
            setLeaderboardData(data)
        }
        getData()
    }, [])

    useEffect(() => {
        const isThereData = () => {
            if(leaderboardData.length) {
            setData(true)}
        } 
        isThereData()
    }, [leaderboardData])

        const leader = leaderboardData[0];
        const secondPlace = leaderboardData[1];
        const thirdPlace = leaderboardData[2];
        const otherPlayers = leaderboardData.slice(3)

        otherPlayers.map(player => {
            let index = leaderboardData.findIndex(x => x.username==`${player.username}`)
            player.place = index+1
        })

    return(
        <section>
            <img src='https://drive.google.com/uc?export=view&id=1sB52ZH3jpNpi9S1IuuEvsp2Op_W_muOe' alt='icon'/>
            <h1>Leaderboard</h1>
            {!data ? <p>Loading data ...</p> :
            <>
            <LeaderboardMessage leader={leader} secondPlace={secondPlace} thirdPlace={thirdPlace}/>
            <table>
               <tbody>
                   <tr id='firstPlace'>
                        <td>1<span><img src = ''></img></span></td>
                        <td>{leader.username}</td>
                        <td>{leader.score}</td>
                    </tr>
                    <tr id ='secondPlace'>
                        <td>2<span><img src = ''></img></span></td>
                        <td>{secondPlace.username}</td>
                        <td>{secondPlace.score}</td>
                    </tr>
                    <tr id='thirdPlace'>
                        <td>3<span><img src = ''></img></span></td>
                        <td>{thirdPlace.username}</td>
                        <td>{thirdPlace.score}</td>
                    </tr>
                    {otherPlayers.map(player => (
                        <tr key={player.username}>
                            <td>{player.place}</td>
                            <td>{player.username}</td>
                            <td>{player.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>}
            <HomeButton />
        </section>
    )
}

export default Leaderboard;
