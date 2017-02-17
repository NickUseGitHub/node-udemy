export default function(req, res, next) {

  if (process.env.NODE_ENV !== 'test') {
    console.log('----- log -----')
    console.log('HTTP request baseUrl', req.baseUrl)
    console.log('HTTP request method', req.method)
    console.log('HTTP request from ip', req.ip)
    console.log('HTTP request hostname', req.hostname)
    console.log('----- end log -----')
  }
  
  next()
}