const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const basicAuth = require('express-basic-auth')
const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

const userRoutes = require("./routes/manageUsers")
const gameRoutes = require("./routes/playerOps")

const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://Cluster77026:U3x9ZFdoYlNx@cluster77026.abum787.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
})

app.use(express.json({ extended: false }));  // init middleware

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// requires each request to have authorization headers!
// app.use(basicAuth({
//   users: { 'admin': 'aRealGoodPassword123' }
// }))

app.use('/assassins', userRoutes)  // enables all user-management endpoints under "/assassins" route
app.use('/survive', gameRoutes)

if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('../frontend/assassins/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'assassins', 'frontend', 'index.html')));
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))