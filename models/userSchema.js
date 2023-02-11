const mongoose = require("mongoose")
const Schema = mongoose.Schema;

let User = new Schema({
  name: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  assassin: {
    type: String,
    required: true
  },
  alive: {
    type: Boolean,
    required: true
  },
  winner: {
    type: Boolean,
    required: true
  },
  tagged:{
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('User', User)