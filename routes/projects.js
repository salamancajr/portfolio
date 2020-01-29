
const { Entry } = require('../models/entry.js')
const { authenticate } = require('../middleware/authenticate')
const { redisClient } = require('../redis')

const expirationTime = 60 * 60 * 24 * 7

module.exports = app => {
  app.get('/api/projects', async (req, res) => {
    try {
      const cachedProjects = await redisClient.get('projects')
      if (cachedProjects) {
        return res.send(JSON.parse(cachedProjects))
      }
      Entry.findAndCacheResponse(res)
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

      redisClient.hset('projectSelection', _id, JSON.stringify(projectEntry), 'EX', expirationTime)
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.post('/api/projects', authenticate, async (req, res) => {
    try {
      const { length } = await Entry.find()
      const orderNum = length

      const entry = new Entry({
        ...req.body,
        orderNum
      })

      const newProject = await entry.save()
      Entry.findAndCacheResponse(res)

      redisClient.hset('projectSelection', newProject._id.toString(), JSON.stringify(newProject), 'EX', expirationTime)
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.patch('/api/projectOrder', authenticate, async (req, res) => {
    try {
      const result = await Promise.all(req.body.order.map(async item =>
        Entry.findOneAndUpdate({ _id: item.id }, { $set: { orderNum: item.orderNum } }, { new: true })
      ))
      res.send(result)

      redisClient.set('projects', JSON.stringify(result), 'EX', expirationTime)
      result.map(project => redisClient.hset('projectSelection', project._id.toString(), JSON.stringify(project), 'EX', expirationTime))
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

      Entry.findAndCacheResponse(res)

      redisClient.hset('projectSelection', _id, JSON.stringify(updatedProject), 'EX', expirationTime)
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

      Entry.findAndCacheResponse(res)

      redisClient.hdel('projectSelection', _id)
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })
}
