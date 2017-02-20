import {Todo} from './../../../model'

const tTodos = [
  {
    _id: new ObjectID(),
    detail: 'first todos'
  },
  {
    _id: new ObjectID(),
    detail: 'second todos'
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