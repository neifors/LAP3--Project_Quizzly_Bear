import axios from 'axios'

export const loginFunction = async (e) => {
    try {
        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const response = await axios.post('https://quizzlybears.azurewebsites.net/users/login', userData)
        const data = response.data
        login(data)
    } catch (err) {
        console.warn(err);
    }

}

export const registerFunction = async (e) => {
    try {
        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const response = await axios.post('https://quizzlybears.azurewebsites.net/users/register', userData)
        const data = response.data
        console.log(data)
    } catch (err) {
        console.warn(err);
    }

}

export const getLeaderboardData = async () => {
    try{
        const response = await axios.get('https://quizzlybears.azurewebsites.net/users')
        const data = response.data;
        const sort= data.sort((a, b) => {
            return b.score - a.score;
        })
        return sort;

    }catch(err){
        console.warn(err)
    }

export const deleteUser = async(username) => {
    console.log(username)
    try {
        const response = await axios.delete('https://quizzlybears.azurewebsites.net/users/delete', {data: {username: username}})
        const data = response.data
        console.log(data)
    } catch  (err) {
        console.warn(err)
    }

}


// helpers

function login(data) {
    localStorage.setItem("token", data.token)
}

