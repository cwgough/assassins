const userSchema = require("../models/userSchema")

async function killPlayer(req, res) {
  const killedPlayer = await userSchema.findOneAndUpdate({ name: req.body.name }, { alive: false })
  const newTarget = await userSchema.findOneAndUpdate({ name: killedPlayer.target }, { assassin: killedPlayer.assassin })
  const newAssassin = await userSchema.findOneAndUpdate({ name: killedPlayer.assassin }, { target: killedPlayer.target })
  if (newAssassin.name == newTarget.name) {
    await userSchema.updateOne({ name: newAssassin.name }, { winner: true })
      .then(
        res.send(`Congratulations, ${newAssassin.name}! You are the final survivor.`)
      )
  } else {
    res.send(`${killedPlayer.name} is dead. ${newAssassin.name} now has ${newTarget.name} as their target.`)
  }
}

module.exports = { killPlayer };