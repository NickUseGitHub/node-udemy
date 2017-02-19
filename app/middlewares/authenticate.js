import jwt from 'jsonwebtoken'
import {SECRET_KEY} from './../config/constant'
import User from './../model/user'

export function authenticate(req, res, next) {
  const token = req.header('app-auth')

  console.log('------token------', token)

  User.findByToken(token)
    .then(user => {
      req.user = user
      next()
    })
    .catch(e => {
      res.status(401).send()
    })
}