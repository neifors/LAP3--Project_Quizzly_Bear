const { MongoClient } = require('mongodb');
const connectionUrl = process.env.DB_CONNECTION || "mongodb://quizzlybearsdb:fbIm47RxHqnwUnbcx5zbGgkCTLIniJwZIC3DSHJajJwdwBuPr95Ywdr1wIKd0D5t1kPBccAG4784ACN5zDyYmQ==@quizzlybearsdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@quizzlybearsdb@";
const dbName = process.env.DB_NAME || process.env.COSMOSDB_DBNAME;


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
