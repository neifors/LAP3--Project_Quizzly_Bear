import axios from "axios";

import { getLeaderboardData, deleteUser, getUserScore, updateUserScore, registerFunction, loginFunction } from ".";

jest.mock('axios');

describe('getLeaderboardData', () => {
    it('successfully gets data from the API', async () => {
        const data = { username: 'Test', score: 4};

        axios.get.mockResolvedValueOnce(data);

        await getLeaderboardData();

        expect(axios.get).toHaveBeenCalledWith(`https://quizzlybears.azurewebsites.net/users`);
    });
})

describe('getUserScore', () => {
    it('successfully gets data from the API', async () => {
        const username = 'Test'
        const data = { username: 'Test', score: 4};

        axios.get.mockResolvedValueOnce(data);

        await getUserScore(username);

        expect(axios.get).toHaveBeenCalledWith(`https://quizzlybears.azurewebsites.net/users/username/${username}`);
    });
})

describe('updateUserScore', () => {
    it('successfully gets data from the API', async () => {
        const data = { username: 'Test', new_score: 4};

        axios.get.mockResolvedValueOnce(data);

        await updateUserScore(data);

        expect(axios.put).toHaveBeenCalledWith(`https://quizzlybears.azurewebsites.net/users/update`, data);
    });
})

describe('deleteUser', () => {
    it('successfully deletes user from the API', async () => {
        const data = { username: 'Test'};

        axios.delete.mockResolvedValueOnce(data);
        
        await deleteUser('Test');

        expect(axios.delete).toHaveBeenCalledWith(`https://quizzlybears.azurewebsites.net/users/delete`, {"data": {"username": "Test"}});
    })

})


