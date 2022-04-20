import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {

    const goTo = useNavigate();

    return(
        <button onClick={() => goTo(-1)}>Go Back</button>
    )
}

export default BackButton
