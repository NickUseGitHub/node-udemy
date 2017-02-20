import jwt from 'jsonwebtoken'
import {HEADER_AUTH} from './../config/constant'
import User from './../model/user'

export function authenticate(req, res, next) {
  const token = req.header(HEADER_AUTH)

  User.findByToken(token)
    .then(user => {
      if (!user) {
        throw 'user not authorized'
      }

      req.user = user
      req.token = token
      next()
    })
    .catch(e => {
      res.status(401).send(e)
    })
}