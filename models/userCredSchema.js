const mongoose = require("mongoose")
const Schema = mongoose.Schema;
/*
base template for user credentials schema 
- might add cookies and pw encryption if have time?
*/
let userCred = new Schema ({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('userCred', userCred)