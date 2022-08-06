// Importamos nuestros modulos 

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


// Importamos nuestras Rutas

const userRouter = require('./routes/user')
const noteRouter = require('./routes/note')

// Creamos la constante app

const app = express()

// Levantamos el servidor

app.use(express.json())
app.use(cors())

// Rutas

app.use('/users', userRouter)
app.use('/api/notes', noteRouter)

// Listen server

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log('Server is runnig on port', PORT)
})


// Conectarse con MongoDB

const URI = process.env.MONGODB_URL

mongoose.connect(URI,{
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true, 
  useUnifiedTopology: true
}, error => {
    if(error) {throw error}
    console.log('Connected to MongoDB')
})