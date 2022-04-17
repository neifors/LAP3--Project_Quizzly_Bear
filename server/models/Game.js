const mongoose = require('mongoose');

const Game = mongoose.model('Game', new mongoose.Schema({
      points: Number,
      coins: Number,
      winner: Boolean
}));

module.exports = Game;
