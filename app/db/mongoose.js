import mongoose from 'mongoose'

const env = process.env.NODE_ENV || 'production'
const dbPort = process.env.DB_PORT || 27017
const dbName = 'nodeUdemy'
const dbUrl = env === 'production'? `mongodb://localhost/${dbName}` : `mongodb://mongo:${dbPort}/${dbName}`

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl)

mongoose.connection.on('connected', () => {
  console.log('%s MongoDB connection established!', "Yes, ")
})
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', "No!!")
  process.exit()
})

export default mongoose