import React from 'react';
import { getAllData } from '../../actions';

const Leaderboard = () => {
    
    getAllData()


    return(
        <section>
            <h1>Leaderboard!</h1>
            <p>See how you compare to other players!</p>
        </section>
    )
}

export default Leaderboard;
