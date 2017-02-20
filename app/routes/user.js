import {Router} from 'express'
import {ObjectID} from 'mongodb'
import {HEADER_AUTH} from './../config/constant'
import {User} from './../model'
import {authenticate} from './../middlewares/authenticate'

const route = Router()

function validateUserIdMiddleWare(req, res, next) {
  if (!req.params.userId) {
    next()
    return
  }

  if (!ObjectID.isValid(req.params.userId)) {
    res.status(400).send('UserId is not valid')
    return
  }

  next()
}

//middlewares
route.use(validateUserIdMiddleWare)

route.get('/user/me', authenticate, (req, res) => {
  res.json({msg: 'success', user: req.user})
})

route.get('/user/:userId', (req, res) => {
  const {userId} = req.params

  User.findById(userId)
    .then(user => res.json({msg: 'success', user}))
    .catch(e => res.status(400).send(e))

})

route.get('/user', (req, res) => {
  User.find()
    .then(users => res.json({msg: 'success', users}))
    .catch(e => res.status(400).send(e))
})

route.put('/user', (req, res) => {
  const user = new User(req.body)

  user.save()
    .then(us => {
      return us.generateAuthToken()
    })
    .then(token => {
      res.header(HEADER_AUTH, token)
        .send(user)
    })
    .catch(e => res.status(400).send('This email or username is invalid.'))
})

route.post('/user/login', (req, res) => {
  const {email, password} = req.body

  User.findByCredentials(email, password)
    .then(user => {
      return user.generateAuthToken()
        .then(token => {
          res.set(HEADER_AUTH, token)
            .json({msg: 'success', user})
        })
    })
    .catch(e => res.status(400).send(e))
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