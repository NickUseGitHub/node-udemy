import mongoose, {Schema} from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import bcrypt from 'bcryptjs'

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

//middleware
schema.pre('save', function(next) {
  const user = this

  if (!user.isModified('password')) {
    next()
  }

  const {password} = user
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      user.password = hash
      next()
    })
  })
})

//override method
schema.methods.toJSON = function() {
  const user = this
  const userObj = user.toObject()

  return _.pick(userObj, ['_id', 'email'])
}

schema.methods.generateAuthToken = function() {
  const user = this
  const access = 'auth'
  const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.SECRET_KEY).toString()

  user.tokens.push({access, token})
  return user.save()
    .then(() => {
      return token
    })
}

schema.methods.removeToken = function(token) {
  const user = this

  user.tokens = _.differenceBy(user.tokens, [{token}], 'token')
  return user.update({
    $pull: {tokens: {token}}
  })
}

schema.statics.findByToken = function(token) {
  const User = this
  let decode

  try {
    decode = jwt.decode(token, process.env.SECRET_KEY)
  } catch (e) {
    return new Promise.reject(e)
  }

  return User.findOne({
    '_id': decode._id,
    'tokens.access': 'auth',
    'tokens.token': token
  })
}

schema.statics.findByCredentials = function(email, password) {
  const User = this
  const returnMsgErr = 'Email or password are invalid'

  return User.findOne({email})
    .then(user => {
      if (!user) {
        return Promise.reject(returnMsgErr)
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) {
            reject(err)
          }

          if (!res) {
            reject(returnMsgErr)
          }

          resolve(user)
        })
      })
    })
}

export default mongoose.model(documentName, schema)