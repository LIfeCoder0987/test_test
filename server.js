const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const items = require('./routes/api/items')

const app = express()

// BodyParser Middleware
app.use(bodyParser.json())

// DB Config
const db = require('./config/Keys').mongoURI

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongodb..."))
  .catch(err => console.log(err))

app.use(cors({origin: "http://localhost:8080"}))
app.use('/api/items', items)

// Serve static if Prodcution
if(process.env.NODE_ENV === 'production')
{
  app.use(express.static('client/build'))
  app.get("*", () => (req,res) => 
  {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server lestening on port ${port}...`))
