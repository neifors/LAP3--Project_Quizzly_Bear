const mongoose = require('mongoose');
const env = require('dotenv');
env.config()
const server = require('./server.js')
const port = process.env.PORT || 3000;

// require("./db_config/dbconfig")();

server.listen(port, ()=>{
    console.log(`server listening on port: ${port}`)
})

mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
   auth: {
     username: process.env.COSMOSDB_USER,
     password: process.env.COSMOSDB_PASSWORD
   },
 useNewUrlParser: true,
 useUnifiedTopology: true,
 retryWrites: false
 })
 .then(() => console.log('Connection to CosmosDB successful'))
 .catch((err) => console.error(err));
