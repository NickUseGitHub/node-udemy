import expect from 'expect'
import rewire from 'rewire'

const app = rewire('./app')

describe('Spies on App', () => {
  const db = {
    saveUser: expect.createSpy()
  }
  app.__set__('db', db)

  it('should call spies', () => {
    const spy = expect.createSpy()
    spy()
    expect(spy).toHaveBeenCalled()
  })

  it('should pass user object', () => {
    const email = 'nick@nick.com', 
          password = '123abc'
    
    app.signUp(email, password)
    expect(db.saveUser).toHaveBeenCalledWith({email, password})

  })
})