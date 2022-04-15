// const { MongoClient } = require('mongodb')
// const dotenv = require("dotenv");
// dotenv.config();
// const { DB_PASSWORD, DB_NAME } = process.env;
// const connectionUrl = process.env.MONGODB_URI || `mongodb://quizzlybearsdb:${DB_PASSWORD}@quizzlybearsdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@quizzlybearsdb@`



// const init = async () => {
//   let client = await MongoClient.connect(connectionUrl, function (err, client) {
//     client.close();
//   });
//   console.log('connected to database!', DB_NAME)
//   return client.db(DB_NAME)
// }


// module.exports = { init };

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { DB_PASSWORD } = process.env;

const connectDB = () => {
  return mongoose
    .connect(
      `mongodb://quizzlybearsdb:${DB_PASSWORD}@quizzlybearsdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@quizzlybearsdb@`,
      {
        // useCreateIndex: true,
        useNewUrlParser: true,
        // useFindAndModify: true,
        useUnifiedTopology: true
      }
    )
    .then(() => console.log(`database connected successfully`))
    .catch((err) => console.log(err.message));
};

module.exports = connectDB;
