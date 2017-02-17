import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import routes from './routes'
import middlewares from './middlewares'

// import './config'
// import './db/mongoose'

const app = new express()

//middlewares
middlewares.map(md => app.use(md))
app.use(bodyParser.json())

//routes app 
routes.map(route => app.use(route))
app.use(express.static(path.resolve(__dirname, './../public')))

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("app is now listen on port", process.env.PORT)
  }
})
export default app