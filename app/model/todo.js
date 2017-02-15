import mongoose, {Schema} from 'mongoose'

// const kittySchema = mongoose.Schema({
//     name: String
// })
// const Kitten = mongoose.model('Kitten', kittySchema)
// const fluffy = new Kitten({ name: 'Silence' })
// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err)
//   console.log('--- kitten save!! ---')
// })
// console.log('Hello Kitty', fluffy.name)

const dbName = 'Todo'
const schema = new Schema({
  detail: {
    type: String, 
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createDate: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model(dbName, schema)