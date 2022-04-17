const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String ,
  games: []
}));

module.exports = User;
