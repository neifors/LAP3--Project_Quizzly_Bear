const {MongoClient} = require("mongodb");
const User = require('../../../models/User')


describe('db test', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = await connection.db(global.__MONGO_DB_NAME__);
    });
  
    afterAll(async () => {
      await connection.close();
    });
  

    it('should get all users', async () => {
        const user = db.collection('user')
        const mockUser = { _id: 'tom_id', username: 'Tom', password: "tom" }
        const mockUserTwo = {_id: 'orla_id', username: 'Orla', password: "orla" }
        const mockreturn = [{ _id: 'tom_id', username: 'Tom', password: "tom" },
                            {_id: 'orla_id', username: 'Orla', password: "orla" }]
        await user.insertOne(mockUser);
        await user.insertOne(mockUserTwo);
        const insertedUser = await user.find().toArray();
        expect(insertedUser).toEqual(mockreturn);
    })

    it('should get one user by username', async () => {
        const user = db.collection('user')
        const mockUser = { _id: 'andrew_id', username: 'Andrew', password: "andrew" }
        const mockUserTwo = {_id: 'isa_id', username: 'Isa', password: "isa" }
        const mockreturn = [{ _id: 'andrew_id', username: 'Andrew', password: "andrew" }]
        await user.insertOne(mockUser);
        await user.insertOne(mockUserTwo);
        const insertedUser = await user.find({username: 'Andrew'}).toArray();
        expect(insertedUser).toEqual(mockreturn);
    })


    it('should create a new user', async () => {
        const user = db.collection('user')
        const mockUser = { _id: 'new_user', username: 'New', password: "new" };
        await user.insertOne(mockUser);
        const insertedUser = await user.findOne({ username: 'New' });
        expect(insertedUser).toEqual(mockUser);
    })
 
})
