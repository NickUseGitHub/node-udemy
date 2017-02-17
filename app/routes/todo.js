import { Router } from 'express'
import {Todo} from '../model'
import { ObjectID } from 'mongodb'

const route = Router()

route.get('/todo', (req, res) => {
  Todo.find()
    .then(todos => res.json({msg:'success', todos}))
    .catch(e => res.status(400).send(e))
})

route.get('/todo/:todoId', (req, res) => {
  const {todoId} = req.params
  Todo.findById(todoId)
    .then(todo => res.json({msg: 'ok', todo}))
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
      res.json({msg: 'success', todo:td})
    }
  })

})

route.post('/todo/:todoId', (req, res) => {
  const reqTodo = req.body.todo
  const {todoId} = req.params
  Todo.update({_id:todoId}, reqTodo, (err, raw) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.json({msg:'sucess', todo: reqTodo})
    }
  })
})

route.delete('/todo/:todoId', (req, res) => {
  const {todoId} = req.params
  
  if (!ObjectID.isValid(todoId)) {
    res.status(400).send('This Id is not valid.')
  }

  Todo.findOneAndRemove({_id: todoId}, (err, todo) => {
    if (err) {
      res.status(400).send(err)
    }else if (!todo) {
      res.status(400).send('This Id is not valid.')

    }else {
      res.json({msg: 'success', todo})
    }
  })
})

export default route