const { Blog } = require('./../models/blog')
const { upload } = require('./../middleware/upload')
const moment = require('moment')
const fs = require('fs')
const AWS = require('aws-sdk')

module.exports = (app, { client }) => {
  app.get('/api/blog', async (req, res) => {
    const cachedBlogs = await client.get('blogs')
    if (cachedBlogs) {
      return res.send(JSON.parse(cachedBlogs))
    }
    Blog.find({}).sort({ orderNum: -1 }).then((data) => {
      console.log('Getting data from mongo')

      res.send(data)
      client.set('blogs', JSON.stringify(data))
    })
  })
  /// ////delete the blog log//////////////////////////

  app.delete('/api/blog/:id', (req, res) => {
    const _id = req.params.id

    Blog.removeAndReduceByOne(_id).then(() => {
      Blog.find({}).then((data) => { res.status(200).send(data) })
    })
  })

  app.post('/api/blog', upload.single('blogImg'), (req, res) => {
    const data = fs.readFileSync(req.file.path)
    const contentType = 'image/png'
    const time = moment().format('MMMM Do YYYY, h:mm:ss a')

    Blog.find({}).then((dataBlog) => {
      const orderNum = dataBlog.length
      const blog = new Blog({
        title: req.body.title,
        text: req.body.text,
        likes: req.body.likes,
        time,
        orderNum,
        img: { data, contentType }
      })

      blog.save().then((data) => {
        res.send(data)
      })
    }, (e) => {
      console.log('error', e)
      res.send(e).status(500)
    })
  })

  app.get('/api/blog/:id', async (req, res) => {
    const _id = req.params.id

    const cachedBlogs = await client.hget('blogSelection', _id)

    if (cachedBlogs) {
      console.log('cache')
      return res.send(JSON.parse(cachedBlogs))
    }

    Blog.findById({
      _id
    }).then((data) => {
      res.send(data)
      client.hset('blogSelection', _id, JSON.stringify(data))
    })
  })

  app.get('/api/presignedRequest/:name&:type', (req, res) => {
    const { name, type } = req.params

    const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    const url = s3.getSignedUrl('putObject', {
      Bucket: 'portfoliogs',
      Key: name,
      ContentType: type
    })
    res.send({ url, name: `https://portfoliogs.s3.amazonaws.com/${name}` })
  })

  app.patch('/api/blog/:id', (req, res) => {
    let check
    const _id = req.params.id
    const { ipAddress } = req.body

    Blog.findById({ _id }).then((data) => {
      if (req.body.likes) {
        if (data.likes.indexOf(ipAddress) > -1) {
          check = {
            $pull: {
              likes: { $in: ipAddress }
            }
          }
        } else {
          check = {
            $push: {
              likes: ipAddress
            }
          }
        }
      } else {
        check = {
          $set: req.body
        }
      }
      return Blog.findOneAndUpdate({ _id }, check)
    }).then(() => {
      Blog.find({}).then(data => res.send(data))
    })
  })

  app.post('/api/blogOrder', (req, res) => {
    Promise.all([req.body.order.map(item => {
      Blog.findOneAndUpdate({ _id: item.id }, { $set: { orderNum: item.orderNum } }, { new: true }).then(data => console.log('data', data))
    })
    ]).then(() => res.sendStatus(200))
  })

  app.get('/dlImages', (req, res) => {
    Blog.find({}).then((data) => {
      data.map(({ img, title }) => {
        fs.writeFileSync(`temp/${title}.jpeg`, Buffer.from(img.data, 'base64'))
      })
    })
  })
}
