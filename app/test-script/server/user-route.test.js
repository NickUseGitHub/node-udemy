import expect from 'expect'
import requestSupertest from 'supertest'
import { ObjectID } from 'mongodb'
import app from './../../server'
import { User } from './../../model'
import {HEADER_AUTH} from './../../config/constant'
import {tempUsers, populateDatas, userForAdd} from './seed/user'

const userForUpdate = Object.assign({}, tempUsers[0])
userForUpdate.name = 'Hello'
userForUpdate.lastname = 'World'

beforeEach(populateDatas)

describe('----- Route:USER -----', () => {

  describe('-- Insert --', () => {
    it('should insert user', done => {
      requestSupertest(app)
        .put('/user')
        .send(userForAdd)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.body)
            .toContainKeys(['_id', 'email'])

          const {_id} = res.body
          User.findById(_id)
            .then(us => {
              expect(us._id).toEqual(_id)
              done()
            })
            .catch(e => done(e))
        })
    })
    it('should not insert invalid email', done => {
      const userInvalidForAdd = Object.assign({}, userForAdd, {email: 'adsfdasfas'})
      
      requestSupertest(app)
        .put('/user')
        .send(userInvalidForAdd)
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.text).toBeA('string')
          done()
        })
    })
  })

  describe('-- Fetch --', done => {
    it('should get all users', done => {
      requestSupertest(app)
        .get('/user')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.body)
            .toContainKeys(['msg', 'users'])

          const {users} = res.body
          expect(users.length).toBe(2)
          done()

        })
    })

    it('should get user by id', done => {
      requestSupertest(app)
        .get(`/user/${tempUsers[0]._id}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.body)
            .toContainKeys(['msg', 'user'])

          const {user} = res.body

          User.findById(user._id)
            .then(us => {

              expect(1).toEqual(1)
              expect(us._id)
                .toEqual(user._id)

              done()
            })
            .catch(e => done(e))
        })
    })

    it('should get user/me by header token', done => {
      requestSupertest(app)
        .get('/user/me')
        .set(HEADER_AUTH, tempUsers[0].tokens[0].token)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.body)
            .toContainKeys(['msg', 'user'])
          
          const {_id, email} = res.body.user
          expect(_id).toBe(tempUsers[0]._id.toHexString())
          expect(email).toBe(tempUsers[0].email)

          done()
        })
    })

    it('should NOT get user/me by header token', done => {
      requestSupertest(app)
        .get('/user/me')
        .set(HEADER_AUTH, tempUsers[0].tokens[0].token + '1')
        .expect(401)
        .end(done)
    })

    it('should login post user/login', done => {
      requestSupertest(app)
        .post('/user/login')
        .send({email: tempUsers[0].email, password: tempUsers[0].password})
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          const {user} = res.body
          expect(res.body).toContainKeys['msg', 'user']
          expect(user._id).toBe(tempUsers[0]._id.toHexString())
          expect(user.email).toBe(tempUsers[0].email)

          done()
        })
    })

    it('should not login post user/login', done => {
      requestSupertest(app)
        .post('/user/login')
        .send({email: tempUsers[0].email, password: `${tempUsers[0].password}432`})
        .expect(400)
        .end(done)
    })

  })

  describe('-- Update --', () => {

    it('should update user', done => {
      requestSupertest(app)
        .post(`/user/${userForUpdate._id}`)
        .send({user: userForUpdate})
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.body)
            .toContainKeys(['msg', 'user'])

          const {user} = res.body
          expect(user._id).toEqual(userForUpdate._id)

          expect(user.name).toEqual(userForUpdate.name)
          expect(user.lastname).toEqual(userForUpdate.lastname)

          expect(user.name).toNotEqual(tempUsers[0].name)
          expect(user.lastname).toNotEqual(tempUsers[0].lastname)

          done()
        })
    })

  })

  describe('-- Delete --', done => {
    it('should delete user', done => {
      requestSupertest(app)
        .delete(`/user/${tempUsers[0]._id}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          expect(res.body)
            .toContainKeys(['msg', 'user'])

          const {user} = res.body
          expect(user._id).toEqual(tempUsers[0]._id)

          User.find()
            .then(users => {
              expect(users.length).toBe(1)
              done()
            })
            .catch(e => done(e))

        })
    })
  })

})