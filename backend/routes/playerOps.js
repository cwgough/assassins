const express = require("express")
const userRoutes = express.Router()

const userSchema = require("../models/userSchema")
const updateGame = require('../controllers/updateGame')

userRoutes.route("/").post((req, res) => {
  userSchema.find({ name: req.body.name }, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      res.json(user)
    }
  })
})

userRoutes.route("/kill").patch((req, res) => {
  updateGame.killPlayer(req, res)
})

module.exports = userRoutes;