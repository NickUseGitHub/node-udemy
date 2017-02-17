import requestSupertest from 'supertest'
import app from './../../server'
import expect from 'expect'
import { ObjectID } from 'mongodb'
import { Todo } from './../../model'

const tempTodos = [
  {
    _id: new ObjectID(),
    detail: 'first todos'
  },
  {
    _id: new ObjectID(),
    detail: 'second todos'
  }
]

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(tempTodos)
    })
    .then(() => done())
    .catch(err => console.log('beforeEach Todo -- ', err))
})

describe('----- Route:TODOS -----', () => {
  describe('-- Insert --', () => {
    it('PUT /todo -- should insert todo in mongo', done => {
      const todoInsert = { detail: 'Yo sarbbb' }

      requestSupertest(app)
        .put('/todo')
        .send(todoInsert)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.body).toBeA('object')

          Todo.find({ detail: todoInsert.detail })
            .then(td => {
              expect(td.length).toBe(1)
              expect(td[0].detail).toBe(todoInsert.detail)
              done()
            })
            .catch(e => done(e))

        })
    })

    it('PUT /todo -- should not insert when invalid todo', done => {
      requestSupertest(app)
        .put('/todo')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err)
          }

          expect(res.body).toBeA('object')
          done()
        })
    })
  })

  describe('-- Fetch --', () => {
    it('GET /todo -- it should get all todos', done => {
      requestSupertest(app)
        .get('/todo')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.body)
            .toContainKey('todos')

          expect(res.body.todos)
            .toBeA('array')

          done()
        })
    })

    it('GET /todo/todoId -- it should get data by id', done => {
      requestSupertest(app)
        .get(`/todo/${tempTodos[0]._id}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          const {todo} = res.body
          Todo.findById(todo._id)
            .then(td => {
              expect(td._id).toEqual(tempTodos[0]._id)
              done()
            })
            .catch(e => done(e))
        })
    })
  })

  describe('-- Update --', () => {
    it('POST /todo -- it should update', done => {
      const todoForUpdate = Object.assign({}, tempTodos[0])
      const {_id} = todoForUpdate
      delete (todoForUpdate._id)
      todoForUpdate.detail = 'test new update'

      requestSupertest(app)
        .post(`/todo/${_id}`)
        .send({ todo: todoForUpdate })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.body)
            .toContainKeys(['msg', 'todo'])

          const {todo} = res.body
          expect(todo.detail)
            .toNotEqual(tempTodos[0].detail)

          done()
        })
    })
  })

  describe('-- Delete --', () => {
    it('DELETE /todo -- it should update', done => {
      const todoForDelete = Object.assign({}, tempTodos[0])
      const {_id} = todoForDelete

      requestSupertest(app)
        .delete(`/todo/${_id}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.body)
            .toContainKeys(['msg', 'todo'])

          expect(res.body.todo._id)
            .toEqual(todoForDelete._id)

          Todo.find().then(td => {
            expect(td.length).toBe(1)
            done()
          })
            .catch(e => done(e))
        })
    })

    it('DELETE /todo -- it should NOT be delete', done => {
      const randId = 'wer32klae2qe'
      requestSupertest(app)
        .delete(`/todo/${randId}`)
        .send()
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.text)
            .toBeA('string')
          done()
        })
    })
  })
})