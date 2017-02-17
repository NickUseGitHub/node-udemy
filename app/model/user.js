import mongoose, {Schema} from 'mongoose'
import validator from 'validator'

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
    unique: true,
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
  }
})

export default mongoose.model(documentName, schema)