import mongoose, {Schema} from 'mongoose'

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
    required: true,
    trim: true
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