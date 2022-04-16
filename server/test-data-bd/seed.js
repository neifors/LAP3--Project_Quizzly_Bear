const User = require("../models/User");
const userData = require("./data.json");

require("../db_config/dbconfig")();

const seedData = async () => {
  try {
    await User.insertMany(userData);
    console.log("data seeded");
  } catch (err) {
    console.log(err.message);
  }
};
seedData();
// const mongoClient = require("mongodb").MongoClient;
// mongoClient.connect("mongodb://quizzlybearsdb:fbIm47RxHqnwUnbcx5zbGgkCTLIniJwZIC3DSHJajJwdwBuPr95Ywdr1wIKd0D5t1kPBccAG4784ACN5zDyYmQ==@quizzlybearsdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@quizzlybearsdb@", function (err, db) {
//   db.close();
// });

