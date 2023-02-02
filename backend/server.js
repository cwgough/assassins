const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const credentials = require("./middleware/credentials")
const corsOptions = require('./config/corsOptions')
const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

const userRoutes = require("./routes/manageUsers")
const gameRoutes = require("./routes/playerOps")
const PORT = process.env.PORT || 8000

app.use(credentials)
app.use(cors(corsOptions))
app.use(bodyParser.json())

//mongoose.connection represents the MongoDB connection and provides access to the underlying Node.js driver's connection object. This connection object is not a collection or a database, it is a reference to the connection established with the MongoDB server.
/*To interact with collections in a MongoDB database, 
you need to define a Mongoose model and use the model's methods to perform CRUD operations on the collections. 
An example of this is in userSchema.js where we define a schema for a User 
*/
mongoose.connect('mongodb://127.0.0.1:27017/assassins', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
})

app.use(express.json({ extended: false }));  // init middleware

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/login", require('./routes/login'))
app.use("/register", require('./routes/register'))
app.use('/assassins', userRoutes)  // enables all user-management endpoints under "/assassins" route
app.use('/survive', gameRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))