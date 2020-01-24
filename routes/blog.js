const { Blog } = require('./../models/blog')
const moment = require('moment')
const { authenticate } = require('../middleware/authenticate')
const { redisClient } = require('../redis')

const expirationTime = 60 * 60 * 24 * 7

module.exports = app => {
  app.get('/api/blog', async (req, res) => {
    try {
      const cachedBlogs = await redisClient.get('blogs')
      if (cachedBlogs) {
        return res.send(JSON.parse(cachedBlogs))
      }
      Blog.findAndCacheResponse(res)
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
      redisClient.hset('blogSelection', _id, JSON.stringify(data), 'EX', expirationTime)
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
      Blog.findAndCacheResponse(res)
      redisClient.hset('blogSelection', newBlog._id.toString(), JSON.stringify(newBlog), 'EX', expirationTime)
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

      redisClient.set('blogs', JSON.stringify(result), 'EX', expirationTime)
      result.map(blog => redisClient.hset('blogSelection', blog._id.toString(), JSON.stringify(blog), 'EX', expirationTime))
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

      Blog.findAndCacheResponse(res)

      redisClient.hset('blogSelection', _id, JSON.stringify(updatedBlog), 'EX', expirationTime)
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
      Blog.findAndCacheResponse(res)

      redisClient.hset('blogSelection', _id, JSON.stringify(newBlog), 'EX', expirationTime)
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })

  app.delete('/api/blog/:id', authenticate, async (req, res) => {
    try {
      const _id = req.params.id

      await Blog.removeAndReduceByOne(_id)

      Blog.findAndCacheResponse(res)

      redisClient.hdel('blogSelection', _id)
    } catch (e) {
      res.sendStatus(500)
      console.log(`error at ${req.url}`, e)
    }
  })
}
