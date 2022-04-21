const { MongoClient } = require('mongodb');
const connectionUrl = process.env.DB_CONNECTION ? process.env.DB_CONNECTION : "mongodb://"+process.env.COSMOSDB_USER+":"+process.env.COSMOSDB_PASSWORD+"@"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@"+process.env.COSMOSDB_DBNAME+"@";
const dbName = process.env.DB_NAME ? process.env.DB_NAME : process.env.COSMOSDB_DBNAME;

const init = async () => {
   let client = await MongoClient.connect(connectionUrl);
   console.log('connected to database!', dbName);
   return client.db(dbName);
}

module.exports = init

// const init = async () => {
//    mongoose.connect(, {
//    auth: {
//       username: process.env.COSMOSDB_USER,
//       password: process.env.COSMOSDB_PASSWORD
//    },
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    retryWrites: false
//    })
//    .then(() => console.log('Connection to CosmosDB successful'))
//    .catch((err) => console.error(err));
// }

// module.exports = init
