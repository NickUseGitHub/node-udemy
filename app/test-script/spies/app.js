const db = require('./db')

export function signUp(email, password) {
  //check user exist
  db.saveUser({
    email,
    password
  })
}