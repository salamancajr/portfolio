const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')
const path = require('path')
const app = express()
const port = process.env.PORT

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (e) => {
  if (!e) {
    console.log('Connected to mongo')
  } else {
    console.log(e)
  }
})

const redisClient = redis.createClient(process.env.REDIS_URL)
redisClient.get = util.promisify(redisClient.get)
redisClient.hget = util.promisify(redisClient.hget)

const bodyParser = require('body-parser')
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(function (err, req, res, next) {
  console.log('error at middleware', err.stack)
  res.status(500).send('Something broke!')
})

app.use(bodyParser.json({
  limit: '50mb'
}))

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

app.use(cors())

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

require('./routes/projects')(app, { redisClient })
require('./routes/authenticate')(app)
require('./routes/blog')(app, { redisClient })
require('./routes/github')(app)
require('./routes/aws')(app)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`Now connected on port ${port}`)
})

module.exports = { app }
