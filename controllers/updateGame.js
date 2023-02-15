const userSchema = require("../models/userSchema")
const axios = require('axios')
require('dotenv').config()

async function killPlayer(req, res) {
  const killedPlayer = await userSchema.findOneAndUpdate({ name: req.body.name }, { alive: false })
  const newTarget = await userSchema.findOneAndUpdate({ name: killedPlayer.target }, { assassin: killedPlayer.assassin })
  const newAssassin = await userSchema.findOneAndUpdate({ name: killedPlayer.assassin }, { target: killedPlayer.target })

  const slackText = `${killedPlayer.name} ${String.fromCodePoint(0x1F52B)} ${killedPlayer.assassin}`

  axios.post(
    process.env.SLACK_WEBHOOK,
    { "text": slackText }
  )

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