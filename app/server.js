import express from 'express'
import path from 'path'
import Twig from 'twig'
import routes from './routes'
import bodyParser from 'body-parser'

import './db/mongoose'

const app = new express()
const port = process.env.PORT || 3002

app.set('views', path.resolve(__dirname, './views'))

app.use(bodyParser.json())

//routes app 
routes.map(route => app.use(route))
app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("app is now listen on port", port)
  }
})

export default app