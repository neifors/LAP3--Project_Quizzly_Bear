import axios from "axios";

import { getLeaderboardData, deleteUser } from ".";

jest.mock('axios');

describe('getLeaderboardData', () => {
    it('successfully gets data from the API', async () => {
        const data = { username: 'Test', score: 4};

        axios.get.mockResolvedValueOnce(data);

        await getLeaderboardData();

        expect(axios.get).toHaveBeenCalledWith(`https://quizzlybears.azurewebsites.net/users`);
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


