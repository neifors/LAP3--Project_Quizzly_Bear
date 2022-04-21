const request = require('supertest');
const app = require('../../server.js');
const resetTestDB = require('./config.js')

describe('users endpoints', () => { 
   
    beforeEach(async () => {
        await resetTestDB.resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    // root /
    it('Should check server up', async () => {
        const res = await request(api).get('/')
        expect(res.statusCode).toEqual(200)
    })

    // /users
    it('Should get all users usernames and scores ', async () => {
        const res = await request(api).get('/users')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].username).toEqual('test1')
        expect(res.body[5].username).toEqual('test6')
        expect(res.body.length).toEqual(6)
    })

    // /users/username/:username
    it('Should get a user by username.', async () => {
        const res = await request(api).get('/users/username/test3')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].username).toEqual('test3')
    })


    // /users/id/:id
    // it('Should get a user by id ', async () => {

    // })

    // /users/register
    it('Should register a new user', async () => {

        const res = await request(api)
            .post('/users/register')
            .send({
                username: "userForTesting",
                password: "passForTesting"
            })

        expect(res.statusCode).toEqual(201)

        expect(res.body).toHaveProperty("msg")

        const newUser = await request(api).get('/users/username/userForTesting')
        expect(newUser.statusCode).toEqual(200);
        expect(newUser.body[0].username).toEqual("userForTesting")
        expect(newUser.body[0].score).toEqual(0)
    })

    // /users/login
    it('Should login a user ', async () => {

        const createUserRes = await request(api)
            .post('/users/register')
            .send({
                username: "loginUserTest",
                password: "loginUserTest"
            })

        expect(createUserRes.statusCode).toEqual(201)
        expect(createUserRes.body).toHaveProperty("msg")

        const res = await request(api)
            .post('/users/login')
            .send({
                username: "loginUserTest",
                password: "loginUserTest"
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    })

    // /users/update
    it('Should update the score of a user by username', async () => {
        const res = await request(api)
            .put('/users/update')
            .send({
                username:'test1',
                new_score: 100
            })
        expect(res.statusCode).toEqual(200);
        const updatedUser = await request(api).get('/users/username/test1');
        expect(updatedUser.statusCode).toEqual(200);
        expect(updatedUser.body[0].score).toEqual(100);

    })

    // /users/delete
    it('Should delete a user by username ', async () => {
        const res = await request(api)
            .delete('/users/delete')
            .send({
                username:'test5',
            })
        expect(res.statusCode).toEqual(200);
        const userRes = await request(api).get('/users/test5');
        expect(userRes.statusCode).toEqual(404);
    })
})
