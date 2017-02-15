import {Router} from 'express'

const route = Router()

route.get('/todo', (req, res) => {
  res.send('get all todos!!!')
})

route.get('/todo/:todoId', (req, res) => {
  const {todoId} = req.params 
  res.send(`get todo id:${todoId}`)
})

route.put('/todo', (req, res) => {
  res.send('create todo!!!')
})

route.post('/todo/:todoId', (req, res) => {
  res.send('update todo!!!')
})

export default route