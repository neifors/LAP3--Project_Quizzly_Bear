const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const env = require('dotenv');
env.config()
const User = require("../models/User")


async function getAll(req, res) {
    try{
        const userData = await User.getall(); 
        res.status(200).json(userData)
    } catch (err) {
        res.status(404).json({err})    
    }
    
}

async function getUserByUsername(req, res) {
    try{
        const userData = await User.getByUsername(req.params.username); 
        res.status(200).json(userData)
    } catch (err) {
        res.status(404).json({err})    
    }
}

async function register(req, res) {
    try{
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        const username = req.body.username
        const password = hashed
        const newUser = await User.createUser(username, password)
        res.status(201).json({user: newUser, msg: "Register Successful"})
    } catch (err) {
        res.status(422).json({err})
    }
}

async function getUserById(req, res) {
    try{
        const userData = await User.getById(req.params.id); 
        res.status(200).json(userData)
    } catch (err) {
        res.status(404).json({err})    
    }
}

async function login(req, res) {
    try {
        const user = await User.getByUsername(req.body.username)
        if (!user) { 
            throw new Error('No user with this username') 
        }
        const authed = await bcrypt.compare(req.body.password, user.password)
        if (!!authed){
            const payload = { username: user.username }
            const sendToken = (err, token) => {
                if(err){ 
                    throw new Error('Error in token generation') 
                }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.SECRET, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
}

async function updateUserScore(req, res) {
    try{
        await User.updateScore(req.body.username, req.body.new_score)
        res.status(200).json({msg: `Update score of user ${req.body.username}: Successful`})
    } catch (err) {
        res.status(304).json({err})
    }
}

async function deleteUser(req, res) {
    try{
        const user = await User.getByUsername(req.body.username)
        const response = await user.remove();
        res.status(200).json({msg: `Delete user ${req.body.username}: Successful`, response: response})
    } catch (err) {
        res.status(500).json({err})
    }
}


module.exports = {getAll, getUserByUsername, register, getUserById, login, updateUserScore, deleteUser}


