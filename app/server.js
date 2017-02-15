import express from 'express'
import path from 'path'
import Twig from 'twig'
import mongoose from 'mongoose'
import routes from './routes'
import bodyParser from 'body-parser'

const env = process.env.NODE_ENV || 'production'
const app = new express()
const port = process.env.PORT || 3002
const dbPort = process.env.DB_PORT || 27017
const dbName = 'nodeUdemy'
const dbUrl = env === 'production'? `mongodb://localhost/${dbName}` : `mongodb://mongo:${dbPort}/${dbName}`

//connect mongo
mongoose.Promise = global.Promise
mongoose.connect(dbUrl)
mongoose.connection.on('connected', () => {
  console.log('%s MongoDB connection established!', "Yes, ")
})
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', "No!!")
  process.exit()
})

app.set('views', path.resolve(__dirname, './views'))

app.use(bodyParser.json())

//routes app 
routes.map(route => app.use(route))

app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  }

  console.log("app is now listen on port", port)
})

export default app