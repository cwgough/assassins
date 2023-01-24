const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

const userRoutes = require("./routes/manageUsers")
const gameRoutes = require("./routes/playerOps")

const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/assassins', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
})

app.use(express.json({ extended: false }));  // init middleware

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/assassins', userRoutes)  // enables all user-management endpoints under "/assassins" route
app.use('/survive', gameRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))