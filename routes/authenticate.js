const { User } = require('./../models/users.js')
const { authenticate } = require('./../middleware/authenticate')
const _ = require('lodash')

module.exports = app => {
  app.post('/api/signup', async (req, res) => {
    try {
      const body = _.pick(req.body, ['email', 'password'])
      const user = new User(body)

      await user.save()
      const token = await user.generateAuthToken()
      res.header('Access-Control-Expose-Headers', 'x-auth')
      res.header('x-auth', token).send(user)
    } catch (e) {
      res.status(400).send(e.message)
    }
  })

  app.post('/api/signin', async (req, res) => {
    try {
      const email = req.body.email
      const password = req.body.password
      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken()
      res.header('x-auth', token).send(user)
    } catch (e) {
      console.log(e)
      res.status(400).send()
    }
  })

  app.get('/api/authenticate', authenticate, (req, res) => {
    res.status(200).send('authentication passed')
  })

  app.delete('/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send()
    }, () => res.status(400).send())
  })
}
