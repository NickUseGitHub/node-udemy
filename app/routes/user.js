import {Router} from 'express'
import {ObjectID} from 'mongodb'
import {User} from '../model'

const route = Router()

function validateUserIdMiddleWare(req, res, next) {
  if (!req.params.userId) {
    next()
  }

  if (!ObjectID.isValid(req.params.userId)) {
    res.status(400).send('UserId is not valid')
  }

  next()
}

//middlewares
route.use(validateUserIdMiddleWare)

route.get('/user/:userId', (req, res) => {
  const userId = req.params

  User.findById(userId)
    .then(user => res.json({msg: 'success', user}))
    .catch(e => res.status(400).send(e))

})

route.get('/user', (req, res) => {
  User.find()
    .then(users => res.send({msg: 'success', users}))
    .catch(e => res.status(400).send(e))
})

route.put('/user', (req, res) => {
  const userReq = req.body.user
  const user = new User(userReq)
  user.save((err, us) => {
    if (err) {
      res.status(400).send(err)
    }

    res.send({msg: 'success', user: us})
  })
})

route.post('/user/:userId', (req, res) => {
  const {user} = req.body
  const {userId} = req.params

  User.update({_id: userId}, user, (err, raw) => {
    if (err) {
      res.status(400).send(err)
    }

    res.json({msg: 'success', user})
  })
})

route.delete('/user/:userId', (req, res) => {
  const {userId} = req.params
  User.findByIdAndRemove(userId, (err, user) => {
    if (err) {
      res.status(400).send('')
    }

    res.json({msg: 'success', user})
  })
})

export default route