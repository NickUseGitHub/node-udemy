import express from 'express'
import path from 'path'
import Twig from 'twig'
import routes from './routes'
import bodyParser from 'body-parser'
import middlewares from './middlewares'

import './config'
import './db/mongoose'

const app = new express()

//middlewares
middlewares.map(md => app.use(md))
app.use(bodyParser.json())

app.set('views', path.resolve(__dirname, './views'))

//routes app 
routes.map(route => app.use(route))
app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("app is now listen on port", process.env.PORT)
  }
})

export default app