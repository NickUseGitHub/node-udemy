import requestSupertest from 'supertest'
import app from '../server'
import expect from 'expect'
import { ObjectID } from 'mongodb'
import Todo from './../model/todo'

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

describe('Server Test', () => {

  describe('----- TODOS -----', () => {
    describe('-- Insert --', () => {
      it('PUT /todo -- should insert todo in mongo', done => {
        const todoInsert = { detail: 'Yo sarbbb' }

        requestSupertest(app)
          .put('/todo')
          .send(todoInsert)
          .expect(200)
          .expect(res => {
            expect(res.body).toBeA('object')
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }

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
          .expect(res => {
            expect(res.body).toBeA('object')
          })
          .end(done)
      })
    })

    it('GET /todo/todoId -- it should get data by id', done => {
      requestSupertest(app)
        .get(`/todo/${tempTodos[0]._id}`)
        .expect(200)
        .expect(res => {
        })
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
})