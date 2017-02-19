import mongoose, {Schema} from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import {SECRET_KEY} from './../config/constant'

const documentName = 'User'
const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  name: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

schema.methods.toJSON = function() {
  const user = this
  const userObj = user.toObject()

  return _.pick(userObj, ['_id', 'email'])
}

schema.methods.generateAuthToken = function() {
  const user = this
  const access = 'auth'
  const token = jwt.sign({_id: user._id.toString(), access}, SECRET_KEY).toString()

  user.tokens.push({access, token})
  return user.save()
    .then(() => {
      return token
    })
}

schema.statics.findByToken = function(token) {
  const User = this
  let decode

  try {
    decode = jwt.decode(token, 'key')
  } catch (e) {
    return new Promise.reject(e)
  }

  return User.findOne({
    '_id': decode._id,
    'tokens.access': 'auth',
    'tokens.token': token
  })
}

export default mongoose.model(documentName, schema)