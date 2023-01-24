const express = require("express")
const userRoutes = express.Router()

const userSchema = require("../models/userSchema")
const assignTargets = require("../controllers/assignTargets")

userRoutes.route("/test").get((req, res) => {
  res.send('Test successful')
})

userRoutes.route("/").get((req, res) => {
  userSchema.find((err, users) => {
    if (err) {
      console.log(err)
    } else {
      res.json(users)
    }
  })
})

userRoutes.route("/add").post((req, res) => {
  let user = new userSchema(req.body)
  user.save()
    .then(user => {
      res.status(201).json({ 'user': `new assassin ${user.name} added successfully` })
    })
    .catch(err => {
      res.status(400).send(`Adding user failed: ${err}`)
    })
})

userRoutes.route("/delete/:name").delete((req, res) => {
  userSchema.deleteOne({ name: req.params.name }, (err, result) => {
    if (err) {
      res.json(`Error: ${err}`)
    } else {
      if (result.deletedCount == 1) {
        res.json({ message: `Deleted assassin ${req.params.name}` })
      } else {
        res.send(`The assassin ${req.params.name} was not found. Nothing was deleted.`)
      }
    }
  })
})

userRoutes.route("/initialize").post((req, res) => {
  assignTargets.addPlayers(req, res)
})

userRoutes.route("/clear").delete((req, res) => {
  userSchema.deleteMany({}, (err, result) => {
    if (err) {
      res.json(`Error: ${err}`)
    } else {
      res.send(`Deleted ${result.deletedCount} players.`)
    }
  })
})

module.exports = userRoutes;