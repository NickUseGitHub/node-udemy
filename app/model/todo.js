import mongoose, {Schema} from 'mongoose'

const documentName = 'Todo'
const schema = new Schema({
  detail: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  _creator: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  }
})

export default mongoose.model(documentName, schema)