import {Router} from 'express'

const route = new Router()

route.get('/', (req, res) => {
  res.send('Hello this is nick-node-udemy app ^ ^')
})

export default route