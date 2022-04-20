const controllers = require("../controllers/users")
const User = require('../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

// describe('user controller', () => {
//    beforeEach(() =>  jest.clearAllMocks());

//    afterAll(() => jest.resetAllMocks());

//    describe('getAll', () => {
//        test('it returns users with a 200 status code', async () => {
//            let testUsers = [{username: "test1", password: "test1", score: 0}, {username: "test2", password: "test2", score: 15}]
//            jest.spyOn(controller,'getAll')
//                 .mockResolvedValue(testUsers);
//            await controller.getAll(null, mockRes);
//            expect(mockStatus).toHaveBeenCalledWith(200);
//            expect(mockJson).toHaveBeenCalledWith(testUsers);
//        })

//    })
// })
