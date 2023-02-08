const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const basicAuth = require('express-basic-auth')
const path = require('path')
const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
require('dotenv').config()

const userRoutes = require("./routes/manageUsers")
const gameRoutes = require("./routes/playerOps")

const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
})

app.use(express.json({ extended: false }));  // init middleware

// requires each request to have authorization headers!
// app.use(basicAuth({
//   users: { 'admin': 'aRealGoodPassword123' }
// }))

// routes
app.use('/assassins', userRoutes)  // enables all user-management endpoints
app.use('/survive', gameRoutes)  // enables all gameplay endpoints

app.use(express.static('client/build'));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))