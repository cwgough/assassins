const userCredSchema = require("../models/userCredSchema")

const handleRegister = async (req, res) => {
  pwd = req.body.password
  uname = req.body.name
  /*password requirement works*/
  if (!pwd) return res.status(400).json({ 'message': 'Password is Required..' })
  userCredSchema.find({ name: uname }, function (err, user) {
    if (err) {
      res.json(`Error: ${err}`)
    } else {
      if (user.length > 0) {
        return res.status(400).json({ 'message': 'Username is already taken..' })
      }
      else {
        let user = new userCredSchema(req.body)
        user.save()
          .then(user => {
            res.status(201).json({ 'user': `new user ${user.name} added successfully` })
          })
          .catch(err => {
            res.status(400).send(`Adding user failed: ${err}`)
          })
      }
    }
  })
}
module.exports = { handleRegister };