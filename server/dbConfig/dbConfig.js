const mongoose = require("mongoose")

const init = async () => {
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
}

module.exports = init
