const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const config = require('config')

const app = express()

// BodyParser Middleware
app.use(express.json())

// DB Config
const db = config.get('mongoURI')

// Connect to mongo
mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to mongodb..."))
  .catch(err => console.log(err))

// CORS ===
app.use(cors({origin: "http://localhost:8080"}))

// Use Routes
app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

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
