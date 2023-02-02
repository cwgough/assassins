const mongoose = require("mongoose")
const Schema = mongoose.Schema;
/*
const Schema = mongoose.Schema;
const assassinSchema = new Schema({
  name: String,
  weapon: String,
});
const Assassin = mongoose.model('Assassin', assassinSchema);
*/
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
  }
})

module.exports = mongoose.model('User', User) //This export is equivalent to "const Assassin = mongoose.model('Assassin', assassinSchema);" from above. 
//User is now a model that can be used to perform CRUD operations