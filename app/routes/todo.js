import { Router } from 'express'
import Todo from '../model/todo'

const route = Router()

route.get('/todo', (req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(e => res.status(400).send(e))
})

route.get('/todo/:todoId', (req, res) => {
  const {todoId} = req.params
  Todo.findById(todoId)
    .then(todos => res.json(todos))
    .catch(e => res.status(400).send(e))
})

route.put('/todo', (req, res) => {
  const todo = new Todo(req.body)

  //save todo
  todo.save((err, td) => {
    if (err) {
      res.status(400)
        .send(err)
    } else {
      res.json(td)
    }
  })

})

route.post('/todo/:todoId', (req, res) => {
  const reqTodo = req.body.todo
  const {todoId} = req.params
  Todo.update({_id:todoId}, reqTodo, (err, raw) => {
    if (raw) {
      res.status(400).send(raw)
    } else {
      res.send({msg:'sucess', reqTodo})
    }
  })
})

route.delete('/todo/:todoId', (req, res) => {
  const {todoId} = req.params
  Todo.findOneAndRemove({_id: todoId}, (err, todo) => {
    if (err) {
      res.status(400).send(err)
    }
    res.json({msg: 'success', todo})
  })
})

export default route