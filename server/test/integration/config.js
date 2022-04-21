const {MongoClient} = require("mongodb");

let db;
let connection;

const resetTestDB = () => {
    return new Promise (async (resolve, reject) => {
        try {
            connection = await MongoClient.connect(process.env.DB_CONNECTION);
            db = await connection.db(process.env.DB_NAME)
            await db.collection('users').deleteMany({});
            await db.collection('users').insertMany([
               {username: "test1", password: "test1", score: 0},
               {username: "test2", password: "test2", score: 15}, 
               {username: "test3", password: "test3", score: 20}, 
               {username: "test4", password: "test4", score: 5},
               {username: "test5", password: "test5", score: 50}, 
               {username: "test6", password: "test6", score: 35}
            ])
            resolve('Test DB reset');
        } catch (err) {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        };
    });
}

module.exports = { resetTestDB }
