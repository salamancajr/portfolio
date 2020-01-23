const { Blog } = require('./../models/blog')
const moment = require('moment')
const { authenticate } = require('../middleware/authenticate')

module.exports = (app, { redisClient }) => {
  app.get('/api/blog', async (req, res) => {
    const cachedBlogs = await redisClient.get('blogs')
    if (cachedBlogs) {
      return res.send(JSON.parse(cachedBlogs))
    }
    Blog.find({}).then((data) => {
      res.send(data)
      redisClient.set('blogs', JSON.stringify(data))
    })
  })

  app.get('/api/blog/:id', async (req, res) => {
    const _id = req.params.id

    const cachedBlog = await redisClient.hget('blogSelection', _id)

    if (cachedBlog) {
      return res.send(JSON.parse(cachedBlog))
    }

    Blog.findById(_id).then((data) => {
      res.send(data)
      redisClient.hset('blogSelection', _id, JSON.stringify(data))
    })
  })

  app.post('/api/blog', authenticate, (req, res) => {
    const { title, text, img } = req.body
    const time = moment().format('MMMM Do YYYY, h:mm:ss a')

    Blog.find({}).then((dataBlog) => {
      const orderNum = dataBlog.length

      const blog = new Blog({
        title,
        text,
        time,
        orderNum,
        img
      })

      blog.save().then((data) => {
        res.send(data)
        redisClient.set('blogs', JSON.stringify(data))
      })
    }, (e) => {
      console.log('error', e)
      res.send(e).status(500)
    })
  })

  app.post('/api/blogOrder', authenticate, async (req, res) => {
    const result = await Promise.all(req.body.order.map(async item => {
      const val = await Blog.findOneAndUpdate({ _id: item.id }, { $set: { orderNum: item.orderNum } }, { new: true }).then(data => data)
      return val
    }))

    res.send(result)
    redisClient.set('blogs', JSON.stringify(result))
  })

  app.patch('/api/blog/:id', authenticate, async (req, res) => {
    const _id = req.params.id
    const ipAddress = req.headers['x-forwarded-for']

    const finalUpdate = await Blog.findById({ _id }).then(data => {
      let update
      if (req.body.likes) {
        if (data.likes.includes(ipAddress)) {
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
      } else {
        update = {
          $set: req.body
        }
      }
      return update
    })
    await Blog.findOneAndUpdate({ _id }, finalUpdate, { new: true }).then(data =>
      redisClient.hset('blogSelection', _id, JSON.stringify(data))
    )
    Blog.find().then(data => {
      res.send(data)
      redisClient.set('blogs', JSON.stringify(data))
    })
  })

  app.delete('/api/blog/:id', authenticate, async (req, res) => {
    const _id = req.params.id

    await Blog.removeAndReduceByOne(_id)

    Blog.find({}).then(data => {
      res.status(200).send(data)
      redisClient.hdel('blogSelection', _id)
      redisClient.set('blogs', JSON.stringify(data))
    })
  })
}
