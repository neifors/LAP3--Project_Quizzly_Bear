import axios from 'axios'
import jwt from 'jwt-decode'

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
        console(data)
    } catch (err) {
        console.warn(err);
    }

}


// helpers

function login(data) {
    let userInfo = jwt(data.token)
    localStorage.setItem("username", userInfo.username)
}
