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

const userForAddOrUpdate = {
  _id: new ObjectID(),
  username: 'cbradleya',
  password: 'cISB0s9r',
  email: 'cbradleya@fda.gov',
  name: 'Christine',
  lastname: 'Bradley'
}

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
      .send(userForAddOrUpdate)
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
  describe('-- Update --', done => { })
  describe('-- Delete --', done => { })
})