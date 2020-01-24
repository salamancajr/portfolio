const { Blog } = require('./../models/blog')
const moment = require('moment')
const { authenticate } = require('../middleware/authenticate')

module.exports = (app, { redisClient }) => {
  app.get('/api/blog', async (req, res) => {
    try {
      const cachedBlogs = await redisClient.get('blogs')
      if (cachedBlogs) {
        return res.send(JSON.parse(cachedBlogs))
      }
      const allData = await Blog.find()
      res.send(allData)
      redisClient.set('blogs', JSON.stringify(allData))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.get('/api/blog/:id', async (req, res) => {
    try {
      const _id = req.params.id
      const cachedBlog = await redisClient.hget('blogSelection', _id)

      if (cachedBlog) {
        return res.send(JSON.parse(cachedBlog))
      }

      const data = await Blog.findById(_id)
      res.send(data)
      redisClient.hset('blogSelection', _id, JSON.stringify(data))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.post('/api/blog', authenticate, async (req, res) => {
    try {
      const { title, text, img } = req.body
      const time = moment().format('MMMM Do YYYY, h:mm:ss a')

      const { length } = await Blog.find()
      const orderNum = length

      const blog = new Blog({
        title,
        text,
        time,
        orderNum,
        img
      })

      const newBlog = await blog.save()
      res.send(newBlog)
      redisClient.hset('blogSelection', newBlog._id.toString(), JSON.stringify(newBlog))

      const updatedAllData = await Blog.find()
      redisClient.set('blogs', JSON.stringify(updatedAllData))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.patch('/api/blogOrder', authenticate, async (req, res) => {
    try {
      const result = await Promise.all(req.body.order.map(async item =>
        Blog.findOneAndUpdate({ _id: item.id }, { $set: { orderNum: item.orderNum } }, { new: true })
      ))

      res.send(result)

      redisClient.set('blogs', JSON.stringify(result))
      result.map(blog => redisClient.hset('blogSelection', blog._id.toString(), JSON.stringify(blog)))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.patch('/api/blog/:id', authenticate, async (req, res) => {
    try {
      const _id = req.params.id

      const updatedBlog = await Blog.findOneAndUpdate({ _id }, {
        $set: req.body
      }, { new: true })

      const allBlogs = await Blog.find()

      res.send(allBlogs)

      redisClient.hset('blogSelection', _id, JSON.stringify(updatedBlog))
      redisClient.set('blogs', JSON.stringify(allBlogs))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.patch('/api/likeBlog/:id', async (req, res) => {
    try {
      let update
      const _id = req.params.id
      const ipAddress = req.headers['x-forwarded-for']

      const blog = await Blog.findById({ _id })

      if (blog.likes.includes(ipAddress)) {
        update = {
          $pull: {
            likes: { $in: ipAddress }
          }
        }
      } else {
        update = {
          $push: {
            likes: ipAddress
          }
        }
      }

      const newBlog = await Blog.findOneAndUpdate({ _id }, update, { new: true })
      const allBlogs = await Blog.find()

      res.send(allBlogs)

      redisClient.hset('blogSelection', _id, JSON.stringify(newBlog))
      redisClient.set('blogs', JSON.stringify(allBlogs))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.delete('/api/blog/:id', authenticate, async (req, res) => {
    try {
      const _id = req.params.id

      await Blog.removeAndReduceByOne(_id)

      const allData = await Blog.find()
      res.status(200).send(allData)

      redisClient.hdel('blogSelection', _id)
      redisClient.set('blogs', JSON.stringify(allData))
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })
}
