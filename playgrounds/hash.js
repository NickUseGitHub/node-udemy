const bcrypt = require('bcryptjs')
const password = 'nick234'

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  })
})

bcrypt.compare(password, '$2a$10$UjfQWpNXJYUB8ocZxnwaKOpvkH.nOY.y3MB/axcxhmr3AUKGraHr6', (err, res) => {
  console.log(res);
})