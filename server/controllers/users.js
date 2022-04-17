const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User")

router.get('/', async (req, res) => {

  User.find({}, ['username', 'games'], (err, users) => {
    // Note that this error doesn't mean nothing was found,
    // it means the database had an error while searching, hence the 500 status
    if (err) return res.status(500).send(err)
    // send the list of all users
    return res.status(200).send(users);
  });

})

router.post('/register', async (req, res) => {
  
  // Proccess to hash the password using bcryptjs 
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(req.body.password, salt)

  // Object User with the username, the hashed password and an empty lists of games.
  const user = new User({
  username: req.body.username,
  password: hashed ,
  games: []
  });

  // This is the way we save the object above into de database returning the new user if there is no error
  user.save((err, saveUser) => {
    if (err) return res.status(500).send(err);
    console.log(saveUser)
    return res.status(201).send(saveUser);
  });

})

module.exports=router;
