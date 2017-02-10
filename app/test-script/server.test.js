import requestSupertest from 'supertest'
import app from '../server'


it('should return simple hello world', (done) => {
  requestSupertest(app)
    .get('/test')
    .expect('Hello World')
    .end(done)
})