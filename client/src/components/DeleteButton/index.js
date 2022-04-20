import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../actions';

const DeleteButton = ({username}) => {

    const goTo = useNavigate();

    const removeUser = async(username) => {
        await deleteUser(username)
        goTo('/')
    }

    return(
        <button onClick={() => removeUser(username)}>Delete Account</button>
    )
}

export default DeleteButton
