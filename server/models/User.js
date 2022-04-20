// const mongoose = require('mongoose');

// const User = mongoose.model('User', new mongoose.Schema({
//   username: String,
//   password: String ,
//   score: Number
// }));

// module.exports = User;
const  init  = require('../dbConfig/dbConfig')

class User {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.score = data.score;
    }

    static getall() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const usersData = await db.collection('users').find().toArray()
                //console.log('in get all function in models', usersData)
                // let users = usersData.map(d => new User({ ...d, id: d._id ,username: d.username, password: d.password, habit: d.habit}))
                resolve(usersData); 
            } catch (err) {
                // console.log(err);
                reject("Error retrieving users")
            }
        })
    }
  }

  module.exports = User
