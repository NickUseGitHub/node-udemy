import db from './db'

export function signUp(email, password) {
  //check user exist
  db.saveUser({
    email,
    password
  })
}