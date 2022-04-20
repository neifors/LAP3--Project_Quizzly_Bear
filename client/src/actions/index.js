import axios from 'axios'

export const loginFunction = async (e) => {
    try {
        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        const response = await axios.post('https://quizzlybears.azurewebsites.net/users/login', userData)
        const data = await response.data
        if (data.err)
        {throw Error(data.err)}
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
        const data = await response.data
        if (data.err)
        {throw Error(data.err)}
    } catch (err) {
        console.warn(err);
    }

}

export const deleteUser = async(username) => {
    try {
        const response = await axios.delete('https://quizzlybears.azurewebsites.net/users/delete', {data: {username: username}})
        const data = response.data
    } catch  (err) {
        console.warn(err)
    }

}


// helpers

function login(data) {
    localStorage.setItem("token", data.token)
}
