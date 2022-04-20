const mongoose = require('mongoose');
const env = require('dotenv');
env.config()
const server = require('./server.js')
const init = require("./dbConfig/dbConfig")

const port = process.env.PORT || 3000;


server.listen(port, ()=>{
    console.log(`server listening on port: ${port}`)
})

// DB CONNECTION
init()
