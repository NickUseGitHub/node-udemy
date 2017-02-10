import requestSupertest from 'supertest'
import app from '../server'
import expect from 'expect'

describe('Server Test', () => {
  it('should return simple hello world', (done) => {
    requestSupertest(app)
      .get('/test')
      .expect(200)
      .expect(res => {
        expect(res.text).toBe('Hello World').toBeA('string')
      })
      .end(done)
  })

  it('should get include user whose name is nick', (done) => {
    requestSupertest(app)
      .get('/users')
      .expect(200)
      .expect(res => {
        expect(res.body)
          .toInclude({name: 'nick', age: 27})
      })
      .end(done)
  })
})