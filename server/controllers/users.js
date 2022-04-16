const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User")



router.post('/register', async (req, res) => {
  
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(req.body.password, salt)

  const user = new User({
  username: req.body.username,
  password: hashed ,
  games: []
  });

  user.save((err, saveUser) => {
    console.log(JSON.stringify(saveUser));
  res.status(201).send("created")
  });

})

module.exports=router;
