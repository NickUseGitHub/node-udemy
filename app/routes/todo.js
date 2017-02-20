import { Router } from 'express'
import { ObjectID } from 'mongodb'
import {authenticate} from './../middlewares/authenticate'
import {Todo} from './../model'

const route = Router()

route.get('/todo', authenticate, (req, res) => {
  Todo.find()
    .then(todos => res.json({msg:'success', todos}))
    .catch(e => res.status(400).send(e))
})

route.get('/todo/:todoId', authenticate, (req, res) => {
  const {todoId} = req.params
  Todo.findById(todoId)
    .then(todo => res.json({msg: 'ok', todo}))
    .catch(e => res.status(400).send(e))
})

route.put('/todo', authenticate, (req, res) => {
  const {user} = req
  const todoForInsert = Object.assign({}, req.body, {_creator: user._id})
  const todo = new Todo(todoForInsert)

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

route.post('/todo/:todoId', authenticate, (req, res) => {
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

route.delete('/todo/:todoId', authenticate, (req, res) => {
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