const { Blog } = require('./../models/blog')
const { upload } = require('./../middleware/upload')
const moment = require('moment')
const fs = require('fs')
const path = require('path')

module.exports = app => {
  app.get('/api/blog', (req, res) => {
    Blog.find({}).sort({ orderNum: +1 }).then((data) => {
      res.send(data)
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

  app.get('/api/blog/:id', (req, res) => {
    const _id = req.params.id

    Blog.findById({
      _id
    }).then((data) => {

      res.send(data)
    })
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
}
