const Post = require("../models/Post");
const postData = require("./data.json");

require("../db_config/dbconfig")();

const seedData = async () => {
  try {
    await Post.insertMany(postData);
    console.log("data seeded");
  } catch (err) {
    console.log(err.message);
  }
};
seedData();
