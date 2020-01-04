const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')
const path = require('path')
const app = express()
const port = process.env.PORT

const client = redis.createClient('redis://127.0.0.1:6379')
client.get = util.promisify(client.get)
client.hget = util.promisify(client.hget)

const bodyParser = require('body-parser')

const { authenticateRouter } = require('./routes/authenticate')
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(500).send('Something broke!')
})

app.use(bodyParser.json({
  limit: '50mb'
}))

app.use('/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

app.use(cors())

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

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

require('./routes/projects')(app, { client })
app.use('/api', authenticateRouter)
require('./routes/blog')(app, { client })
require('./routes/github')(app)

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
