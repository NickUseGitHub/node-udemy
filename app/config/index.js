const testPort = 3002
      ,devPort = 3002
      ,dbPort = 27017
      ,dbName = 'nodeUdemy'

switch(process.env.NODE_ENV) {
  case 'test':
    process.env.PORT = testPort
    process.env.MONGODB_URI = `mongodb://mongo:${dbPort}/${dbName}`
    break
  case 'development':
    process.env.PORT = devPort
    process.env.MONGODB_URI = `mongodb://mongo:${dbPort}/${dbName}`
    break
  default:
    process.env.MONGODB_URI = 'mongodb://mongoAd:mongoPs@ds153659.mlab.com:53659/heroku_bjzk3v04'
}