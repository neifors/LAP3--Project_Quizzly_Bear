const controller = require('../../../controllers/users')
const User = require('../../../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('user controller', () => {
   beforeEach(() =>  jest.clearAllMocks());

   afterAll(() => jest.resetAllMocks());

   describe('getAll', () => {
      test('it returns  all users with a 200 status code', async () => {
         let testUsers = [
            {
               _id:"test1", 
               username: "test1", 
               password: "test1", 
               score: 0
            },
            {
               _id:"test1", 
               username: "test2", 
               password: "test2", 
               score: 15
            }
         ]
         let usersResult = testUsers.map(user => new User(user))
         jest.spyOn(User,'getall')
               .mockResolvedValue(testUsers);
         await controller.getAll(null, mockRes);
         expect(mockStatus).toHaveBeenCalledWith(200);
         expect(mockJson).toHaveBeenCalledWith(usersResult);
      })
   });

   describe('getUserByUsername', () => {
      test('it returns a user by username with a 200 status code', async () => {
         let testUser = {
            _id:"test1", 
            username: "test1", 
            password: "test1", 
            score: 0
         }
         jest.spyOn(User, 'getByUsername')
            .mockResolvedValue(testUser);   
         const mockReq = { params: {username: 'test1'} }
         await controller.getUserByUsername(mockReq, mockRes);
         expect(mockStatus).toHaveBeenCalledWith(200);
         expect(mockJson).toHaveBeenCalledWith([new User(testUser)]);
      })
   });

   describe('getUserById', () => {
      test('it returns a user by username with a 200 status code', async () => {
         let testUser = {
            _id:"test1", 
            username: "test1", 
            password: "test1", 
            score: 0
         }
         jest.spyOn(User, 'getById')
            .mockResolvedValue(testUser);   
         const mockReq = { params: {id: 'test1'} }
         await controller.getUserById(mockReq, mockRes);
         expect(mockStatus).toHaveBeenCalledWith(200);
         expect(mockJson).toHaveBeenCalledWith([new User(testUser)]);
      })
   });

   describe('register', () => {
      test('it creates a new user with a 201 status code', async () => {
         let testUser = {
            username: 'futureproof', 
            password: 'futureproof', 
         }
         jest.spyOn(User, 'createUser')
            .mockResolvedValue(testUser);   
         const mockReq = { body: { username: 'futureproof' , password: 'futureproof'} }
         await controller.register(mockReq, mockRes);
         expect(mockStatus).toHaveBeenCalledWith(201);
         expect(mockJson).toHaveBeenCalledWith({user: testUser, msg: "Register Successful"});
      })
   });

   describe('updateUserScore', () => {
      test('it returns a 200 status code and a message', async () => {
          let testUser = {
               username: 'futureproof', 
               password: 'futureproof', 
            }
          
          jest.spyOn(User, 'updateScore')
              .mockResolvedValue(testUser); 
          const mockReq = { body: { username: "futureproof", new_score: 100 } }
          await controller.updateUserScore(mockReq, mockRes);
          expect(mockStatus).toHaveBeenCalledWith(200);
          expect(mockJson).toHaveBeenCalledWith({msg: `Update score of user futureproof: Successful`});
      })
  });

    describe('deleteUser', () => {
        test('it deletes a user and returns a 200 status code', async () => {

            let userTest = {
               _id:"test1", 
               username: "test1", 
               password: "test1", 
               score: 0
            }

            jest.spyOn(User, 'getByUsername')
                .mockResolvedValue(userTest)
            jest.spyOn(User.prototype, 'remove')
                .mockResolvedValue('Deleted');
            
            const mockReq = { params: { username:'test1' } }
            await controller.deleteUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });


    // ------------------------- //
    // NO IDEA HOW TO TEST LOGIN //
    // ------------------------- //


   //  describe('login', () => {
   //    test('user login returns a token and 200 status code', async () => {
         
   //       let userTest = {
   //          _id:"test1", 
   //          username: "test1", 
   //          password: "test1", 
   //          score: 0
   //       }
   //       jest.spyOn(User, 'getByUsername')
   //           .mockResolvedValue(userTest)
   //       jest.spyOn(bcrypt, 'compare')
   //           .mockResolvedValue(true)

   //    })
   //  })
   
})
