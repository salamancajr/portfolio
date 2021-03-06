var { User } = require('./../models/users')
const chalk = require('chalk')
const log = console.log

var authenticate = (req, res, next) => {
  var token = req.header('x-auth')
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(Error('no user'))
    }
    req.user = user
    req.token = token
    next()
  }).catch((e) => {
    log(chalk.red('error at finding user by token'))

    res.sendStatus(401)
  })
}
module.exports = { authenticate }
