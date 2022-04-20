const { ObjectId } = require('mongodb');
const  init  = require('../dbConfig/dbConfig')

class User {
    constructor(data) {
        this.username = data.username;
        // this.password = data.password;
        this.score = data.score;
    }

    static getall() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const result = await db.collection('users').find().toArray()
                resolve(result); 
            } catch (err) {
                reject("Error retrieving users")
            }
        })
    }

    static getByUsername(username) {
        return new Promise(async (resolve, reject) => {
            // console.log(username)
            try{
                const db = await init();
                let user = await db.collection('users').find({ username: username }).toArray()
                resolve(user[0])
            } catch (err) {
                reject(`User: ${username} not found.`)
            }
        })
    }
  
    
    static getById(id) {
        return new Promise(async (resolve, reject) => {
            try{
                const db = await init();
                let user = await db.collection('users').find({ _id: ObjectId(id) }).toArray()
                resolve(user[0])
            } catch (err) {
                reject(`User not found.`)
            }
        })
    }

    static createUser(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let exists = await db.collection('users').findOne({username: username})
                if(!exists){
                    let userData = await db.collection('users').insertOne({ 
                                                                    username: username, 
                                                                    password: password, 
                                                                    score: 0 });
                    resolve(userData);
                }
                else{
                    reject(`${username} already exists`);
                }
            } catch (err) {
                reject(`Error creating user: ${username}`);
            }
        });
    }


    static updateScore(username, new_score) {
        return new Promise(async (resolve, reject) => {
            try{
                const db = await init();
                await db.collection('users').updateOne( {username: username}, { $inc: { score: new_score } } )
                resolve(`Updated the score for ${username}`)
            } catch (err) {
                reject(`Error updating the score: ${err}`)
            }
        })
    }

    remove() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection('users').deleteOne({ username: this.username })
                resolve(`${this.username} deleted`)
            } catch (err) {
                reject(`${this.username} could not be deleted`)
            }
        })
    }

}

  module.exports = User

