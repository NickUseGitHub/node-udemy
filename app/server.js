import express from 'express'
import path from 'path'
import Twig from 'twig'
import mongoose from 'mongoose'

const env = process.env.NODE_ENV || 'production'
const app = new express()
const port = process.env.PORT || 3002
const dbPort = process.env.DB_PORT || 27017
const dbUrl = env === 'production'? `mongodb:${dbPort}//localhost/myappdatabase` : `mongo:${dbPort}//mongo`

mongoose.connect(dbUrl)

app.set('views', path.resolve(__dirname, './views'))

app.get('/', (req, res) => {
  res.render('index.twig', {
    name: 'nick naja eiei'
  })
})

app.get('/test', (req, res) => {
  res.send('Hello World')
})

app.get('/users', (req, res) => {
  
  const users = [
    {
      name: 'nick',
      age: 27
    }
  ]

  res.status(200)
    .json(users)

})

app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  }

  console.log("app is now listen on port", port)
})

export default app