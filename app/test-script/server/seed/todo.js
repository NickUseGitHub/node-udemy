import {ObjectID} from 'mongodb'
import {Todo} from './../../../model'
import {tempUsers} from './user'

const tTodos = [
  {
    _id: new ObjectID(),
    detail: 'first todos',
    _creator: tempUsers[0]._id
  },
  {
    _id: new ObjectID(),
    detail: 'second todos',
    _creator: tempUsers[0]._id
  }
]

export const tempTodos = tTodos

export function populateDatas(done) {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(tTodos)
    })
    .then(() => done())
    .catch(err => console.log('beforeEach Todo -- ', err))
}