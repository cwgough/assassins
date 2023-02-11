const userSchema = require("../models/userSchema")
const userCredSchema = require("../models/userCredSchema")

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
      "winner": false,
      "tagged": false
    })
  }
  return assignments
}

async function addPlayers(names, res) {
  const result = await userSchema.insertMany(assignTargets(names))
  res.send(`${result.length} players were initialized.`)
}

// '/initialize' route calls addPlayers. It's currently a Post method, but if we're grabbing from database it probably shouldn't be that.. maybe an update request?
// addPlayers is passed an array of names eg. ["James", "Bob", "Dan"]
// Our goal: pass an array of names from userCred database





module.exports = { addPlayers }