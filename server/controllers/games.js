const express = require('express');
const router = express.Router();

const env = require('dotenv');
env.config()

const User = require("../models/User")
const Game = require("../models/Game")

// https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}

// const category = {"General Knowledge":"9", "Books":"10", "Film":"11", "Music":"12", "Video games":"15", "Computers":"18", "Mythology":"20", "Sports":"21", "Geography":"22", "Animals":"27", "Comics":"29", "Japanese Anime & Manga":"31"}

// const difficulty = ["easy","medium","hard"]

// const type = {"Multiple Choice":"multiple", "True/False":"boolean"}

router.use('/', (req, res) => {
   res.send("Welcome to games =)")
})
 module.exports = router



