const userSchema = require("../models/userSchema")

const shuffleArray = arrayNames => {
  for (let i = arrayNames.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arrayNames[i];
    arrayNames[i] = arrayNames[j];
    arrayNames[j] = temp;
  }
  return (arrayNames)
}

const getProxy = (inputArray) => {
  const proxy = new Proxy(inputArray, {
    get(target, prop) {
      if (!isNaN(prop)) {
        prop = parseInt(prop, 10);
        if (prop < 0) {
          prop += target.length;
        } else if (prop > target.length - 1) {
          prop -= target.length;
        }
      }
      return target[prop];
    }
  })
  return proxy
}

const assignTargets = (names) => {
  const arrayNames = getProxy(shuffleArray(names))
  let assignments = []
  for (let i = 0; i < arrayNames.length; i++) {
    assignments.push({
      "name": arrayNames[i],
      "target": arrayNames[i + 1],
      "assassin": arrayNames[i - 1],
      "alive": true,
      "winner": false
    })
  }
  return assignments
}

async function addPlayers(req, res) {
  const result = await userSchema.insertMany(assignTargets(req.body.playerList))
  res.send(`${result.length} players were initialized.`)
}

module.exports = { addPlayers }