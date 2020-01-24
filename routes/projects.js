
const { Entry } = require('../models/entry.js')
const { authenticate } = require('../middleware/authenticate')

module.exports = (app, { redisClient }) => {
  app.get('/api/projects', async (req, res) => {
    try {
      const cachedProjects = await redisClient.get('projects')
      if (cachedProjects) {
        return res.send(JSON.parse(cachedProjects))
      }
      const allProjects = await Entry.find().sort({ orderNum: +1 })
      res.send(allProjects)
      redisClient.set('projects', JSON.stringify(allProjects))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.get('/api/projects/:id', async (req, res) => {
    try {
      const _id = req.params.id
      const cachedBlog = await redisClient.hget('projectSelection', _id)

      if (cachedBlog) {
        return res.send(JSON.parse(cachedBlog))
      }
      const projectEntry = await Entry.findById(_id)

      res.send(projectEntry)

      redisClient.hset('projectSelection', _id, JSON.stringify(projectEntry))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.post('/api/projects', authenticate, async (req, res) => {
    try {
      const entry = new Entry(req.body)

      const newProject = await entry.save()
      const allProjects = await Entry.find()

      res.status(200).send(allProjects)

      redisClient.hset('projectSelection', newProject._id.toString(), JSON.stringify(newProject))
      redisClient.set('projects', JSON.stringify(allProjects))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.post('/api/projectOrder', authenticate, async (req, res) => {
    try {
      const result = await Promise.all(req.body.order.map(async item =>
        Entry.findOneAndUpdate({ _id: item.id }, { $set: { orderNum: item.orderNum } }, { new: true })
      ))
      res.send(result)

      redisClient.set('projects', JSON.stringify(result))
      result.map(project => redisClient.hset('projectSelection', project._id.toString(), JSON.stringify(project)))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.patch('/api/projects/:id', authenticate, async (req, res) => {
    try {
      const _id = req.params.id

      const updatedProject = await Entry.findByIdAndUpdate({ _id },
        {
          $set: req.body
        }, { new: true })

      const allProjects = await Entry.find()
      res.send(allProjects)

      redisClient.set('projects', JSON.stringify(allProjects))
      redisClient.hset('projectSelection', _id, JSON.stringify(updatedProject))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.delete('/api/projects/:id', authenticate, async (req, res) => {
    try {
      const _id = req.params.id

      await Entry.findOneAndRemove({
        _id
      })

      const updatedEntries = await Entry.find()

      res.send(updatedEntries)

      redisClient.set('projects', JSON.stringify(updatedEntries))
      redisClient.hdel('projectSelection', _id)
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })
}
