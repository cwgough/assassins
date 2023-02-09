const express = require("express")
const userRoutes = express.Router()
/*importing our models*/
const userCredSchema = require("../models/userCredSchema")
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


/* Mock route to test 
userRoutes.route("/credTest").get(function(req,res){
  userCredSchema.find({}, function(err,users){
    if(err){
      res.json(`Error: ${err}`)
    }else{
      res.json({ message: `Pulling users from database..` })
      let names = users.map(({name})=>name)
      console.log(names)
    }
  })
})
*/
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

userRoutes.route("/initialize").get((req, res) => {
  userCredSchema.find({}, function (err, users) {
    if (err) {
      res.json(`Error: ${err}`)
    } else {
      //previous error occured because sending a res.send here BUT the return of assignTargets.addPlayers(..) also sends a res.send so deleted this one
      let names = users.map(({ name }) => name)
      assignTargets.addPlayers(names, res)
    }
  })
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

userRoutes.route("/clearUsers").delete((req, res) => {
  userCredSchema.deleteMany({}, (err, result) => {
    if (err) {
      res.json(`Error: ${err}`)
    } else {
      res.send(`Deleted ${result.deletedCount} users.`)
    }
  })
})

module.exports = userRoutes;