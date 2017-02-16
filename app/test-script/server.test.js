import requestSupertest from 'supertest'
import app from '../server'
import expect from 'expect'
import Todo from './../model/todo'

beforeEach(done => {
  Todo.remove({})
    .then(() => done())
    .catch(err => console.log('beforeEach Todo -- ', err))
})

describe('Server Test', () => {
  
  const todoObj = {detail: "Yeahhh ha"}

  describe('DB test', () => {
    
    it('should insert todo in mongo', done => {
      requestSupertest(app)
        .put('/todo')
        .send(todoObj)
        .expect(200)
        .expect(res => {
          console.log('res.body', res.body)
          expect(res.body).toBeA('object')
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          Todo.find({detail: todoObj.detail})
            .then(todos => {
              expect(todos.length).toBe(1)
              expect(todos[0].detail).toBe(todoObj.detail)
              done()
            })
            .catch(e => done(e))

        })
    })
  })

})