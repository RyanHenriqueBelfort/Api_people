const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

//rota da api
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

app.get('/', (req, res) => {
  res.json({message: 'Hi express!'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

// mongodb+srv://ryan:159753@cluster0.ceknc.mongodb.net/bancodaapi?retryWrites=true&w=majority*/

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ceknc.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(()=>{
  console.log('Conected at MongoDb')
  app.listen(21262)
})
.catch((err) => console.log(err))