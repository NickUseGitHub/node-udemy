import requestSupertest from 'supertest'
import app from '../server'
import expect from 'expect'


it('should return simple hello world', (done) => {
  requestSupertest(app)
    .get('/test')
    .expect(200)
    .expect(res => {
      expect(res.text).toBe('Hello World').toBeA('string')
    })
    .end(done)
})