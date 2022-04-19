const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const env = require('dotenv');
env.config()

const User = require("../models/User")

router.get('/', async (req, res) => {
// Return a list of all users information apart from the password

    User.find({}, ['username', 'score'], (err, users) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err)
        return res.status(200).send(users);
    });

})

router.get('/username/:username', async (req, res) => {
// Return a user info by username (no password)

    User.find({username: req.params.username}, ['username', 'score'], (err, users) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(users);
    });
})

router.get('/id/:id', (req, res) => {
// Return a user info by id (no password)

    User.findById(req.params.id, ['username', 'score'],  (err, user) => {

        if (err) return res.status(500).send(err)
        return res.status(200).send(user)
    });
})

router.post('/register', async (req, res) => {
// Create a new user
    try {

        const foundUser = await User.find({username: req.body.username}, (err, user) => {
            if (err) return (err)
            return (user);
        });

        if (foundUser.length) throw new Error("User already exist")

        // Proccess to hash the password using bcryptjs 
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)

        // Object User with the username, the hashed password and an empty lists of games.
        const user = new User({
        username: req.body.username,
        password: hashed ,
        score: 0
        });

        // This is the way we save the object above into de database returning the new user if there is no error
        user.save((err, saveUser) => {
            if (err) return res.status(500).json({err: err});
            return res.status(201).json({user: saveUser, msg: "Register Successful"});
        });
    }catch(e){
        return res.status(302).json({err: e});
    }

})

router.post('/login', async (req, res) => {
// Check if the inputs are correct. If yes, login the user sending back a token containing the username 

    try {
        const foundUser = await User.find({username: req.body.username}, (err, user) => {
            if (err) return (err)
            return (user);
        });
        const correct= await bcrypt.compare(req.body.password.toString(), foundUser[0].password.toString());

        if(correct){
            const token= jwt.sign({username: foundUser.username}, process.env.SECRET)
            return res.status(200).json({token: token, msg: "Login Successful"});
        } else {
            return res.status(403).json({err: "Wrong password"}) //unauthorised http response
        }

    } catch(err){
        console.log(err);
        res.status(401).json({ err });
    }

})

module.exports=router;
