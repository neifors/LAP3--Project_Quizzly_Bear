const { MongoClient } = require('mongodb')
const dotenv = require("dotenv");
dotenv.config();
const { DB_PASSWORD, DB_NAME } = process.env;
const connectionUrl = "mongodb://quizzlybearsdb:fbIm47RxHqnwUnbcx5zbGgkCTLIniJwZIC3DSHJajJwdwBuPr95Ywdr1wIKd0D5t1kPBccAG4784ACN5zDyYmQ%3D%3D@quizzlybearsdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@quizzlybearsdb@"



const init = async () => {
  let client = await MongoClient.connect(connectionUrl, function (err, client) {
    client.close();
  });
  console.log('connected to database!', DB_NAME)
  return client.db(DB_NAME)
}


module.exports =  init ;

