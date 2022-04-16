const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String ,
  games: [{
      points: Number,
      coins: Number,
      opponent: ObjectId,
      winner: Boolean
  }]
}));

module.exports = User;
