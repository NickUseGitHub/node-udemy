import {Router} from 'express'

const route = Router()

route.get('/todo', (req, res) => {
  res.send('This is todo!!!')
})

export default route