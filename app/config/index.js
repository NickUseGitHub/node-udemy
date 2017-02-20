import dotenv from 'dotenv'
import path from 'path'

switch(process.env.NODE_ENV) {
  case 'test':
    dotenv.load({ path: path.resolve(__dirname, './.env.test.app') })
    break
  case 'development':
    dotenv.load({ path: path.resolve(__dirname, './.env.dev.app') })
    break
}

console.log('************************************************')
console.log('*')
console.log(`**  server : ${process.env.NODE_ENV}`)
console.log(`**  port : ${process.env.PORT}`)
console.log(`**  mongodb_uri : ${process.env.MONGODB_URI}`)
console.log('*')
console.log('************************************************')