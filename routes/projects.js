
const { Entry } = require('../models/entry.js')
const { authenticate } = require('../middleware/authenticate')

module.exports = (app, { redisClient }) => {
  app.get('/api/api', async (req, res) => {
    const cachedProjects = await redisClient.get('projects')
    if (cachedProjects) {
      return res.send(JSON.parse(cachedProjects))
    }
    Entry.find({}).sort({ orderNum: +1 }).then((data) => {
      res.send(data)
      redisClient.set('projects', JSON.stringify(data))
    })
  })

  app.get('/api/api/:id', async (req, res) => {
    const _id = req.params.id
    const cachedBlog = await redisClient.hget('projectSelection', _id)

    if (cachedBlog) {
      return res.send(JSON.parse(cachedBlog))
    }
    Entry.findById(_id).then((data) => {
      res.send(data)
      redisClient.hset('projectSelection', _id, JSON.stringify(data))
    })
  })

  app.post('/api/api', authenticate, async (req, res) => {
    const entry = new Entry(req.body)

    entry.save().then((data) => {
      res.status(200).send(data)
      redisClient.set('projects', JSON.stringify(data))
    }, (e) => {
      res.send(e)
    })
  })

  app.post('/api/projectOrder', authenticate, async (req, res) => {
    const result = await Promise.all(req.body.order.map(async item => {
      const val = await Entry.findOneAndUpdate({ _id: item.id }, { $set: { orderNum: item.orderNum } }, { new: true }).then(data => data)
      return val
    }))
    res.send(result)
    redisClient.set('projects', JSON.stringify(result))
  })

  app.patch('/api/api/:id', authenticate, async (req, res) => {
    const _id = req.params.id

    await Entry.findByIdAndUpdate({ _id },
      {
        $set: req.body
      }, { new: true })

    const updatedEntries = await Entry.find({})
    res.send(updatedEntries)
    redisClient.set('projects', JSON.stringify(updatedEntries))
  })

  app.delete('/api/api/:id', authenticate, async (req, res) => {
    const _id = req.params.id

    await Entry.findOneAndRemove({
      _id
    })

    const updatedEntries = await Entry.find({})
    res.status(200).send(updatedEntries)
    redisClient.hdel('projectSelection', _id)
    redisClient.set('projects', JSON.stringify(updatedEntries))
  })
}
