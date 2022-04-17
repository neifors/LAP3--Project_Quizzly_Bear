const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User= require('../models/User')


// users index route 
router.get('/', async (req, res) => {
  try {
      const users = await User.all
      res.json(users)
  } catch(err) {
      res.status(500).json({err})
  }
})

router.post('/register', async (req, res)=> {
  try {
    const checkeusername = await User.findByUsername(req.body.username)
    if(checkeusername) {
        return res.status(400).send("Username already exists")
    }
  } catch(err){
      console.log(err)
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(req.body.password, salt)
      console.log(hashed)
      const data = {username: req.body.username, password: hashed, games: []}
      console.log(data)
      const result = await User.create( data )
      if (!result){
          return res.status(500).json({msg: 'user couldnt be registered'})
      }
      res.status(201).json({msg: 'User created',newuser: result})
  }
})

module.exports = router
