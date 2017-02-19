import jwt from 'jsonwebtoken'
import {ObjectID} from 'mongodb'
import {User} from './../../../model'
import {SECRET_KEY} from './../../../config/constant'

const _id1 = new ObjectID()
const _id2 = new ObjectID()
const accessType = 'auth'

const tUsers = [
  {
    _id: _id1,
    username: 'cnichols0',
    password: 'K0ugFfUHW',
    email: 'cnichols0@netlog.com',
    name: 'Cynthia',
    lastname: 'Nichols',
    tokens: [{
      access: accessType,
      token: jwt.sign({_id: _id1.toHexString(), accessType}, SECRET_KEY).toString()
    }]
  },
  {
    _id: _id2,
    username: 'dchavez1',
    password: 'IMkxin',
    email: 'dchavez1@tinypic.com',
    name: 'David',
    lastname: 'Chavez'
  }
]

export const userForAdd = {
  _id: new ObjectID(),
  username: 'cbradleya',
  password: 'cISB0s9r',
  email: 'cbradleya@fda.gov',
  name: 'Christine',
  lastname: 'Bradley'
}

export const tempUsers = tUsers

export function populateDatas(done) {
  User.remove({})
    .then(() => {
      return User.insertMany(tUsers)
    })
    .then(() => done())
    .catch(e => console.log('beforeEach User -- ', err))
}