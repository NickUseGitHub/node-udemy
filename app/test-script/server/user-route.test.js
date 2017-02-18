import expect from 'expect'
import requestSupertest from 'supertest'
import { ObjectID } from 'mongodb'
import app from './../../server'
import { User } from './../../model'

const tempUsers = [
  {
    _id: new ObjectID(),
    username: 'cnichols0',
    password: 'K0ugFfUHW',
    email: 'cnichols0@netlog.com',
    name: 'Cynthia',
    lastname: 'Nichols'
  },
  {
    _id: new ObjectID(),
    username: 'dchavez1',
    password: 'IMkxin',
    email: 'dchavez1@tinypic.com',
    name: 'David',
    lastname: 'Chavez'
  }
]

const userForAdd = {
  _id: new ObjectID(),
  username: 'cbradleya',
  password: 'cISB0s9r',
  email: 'cbradleya@fda.gov',
  name: 'Christine',
  lastname: 'Bradley'
}

const userForUpdate = Object.assign({}, tempUsers[0])
userForUpdate.name = 'Hello'
userForUpdate.lastname = 'World'

beforeEach(done => {
  User.remove({})
    .then(() => {
      return User.insertMany(tempUsers)
    })
    .then(() => done())
    .catch(e => console.log('beforeEach User -- ', err))
})

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
            .toContainKeys(['msg', 'user'])

          const {user} = res.body
          User.findById(user._id)
            .then(us => {
              expect(us._id).toEqual(user._id)
              done()
            })
            .catch(e => done(e))
        })
    })
  })

  describe('-- Fetch --', done => {
    it('it should get all users', done => {
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

    it('it should get user by id', done => {
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
  })

  describe('-- Update --', () => {

    it('it should update user', done => {
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
    it('it should delete user', done => {
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