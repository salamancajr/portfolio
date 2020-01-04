
const { Entry } = require('./../models/entry.js')
const { upload } = require('./../middleware/upload')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const { authenticate } = require('./../middleware/authenticate')
const fs = require('fs')
const path = require('path')

module.exports = (app, { client }) => {
  app.get('/api/api', async (req, res) => {
    const cachedBlogs = await client.get('projects')
    if (cachedBlogs) {
      return res.send(JSON.parse(cachedBlogs))
    }
    Entry.find({}).sort({ orderNum: +1 }).then((data) => {
      res.send(data)
      client.set('projects', JSON.stringify(data))
    })
  })

  app.post('/api/api', upload.single('avatar'), async (req, res) => {
    const contentType = 'image/png'

    const data = await
    imagemin([req.file.path], 'build/images', {
      plugins: [
        imageminJpegtran(),
        imageminPngquant({ quality: '65-80' })
      ]
    })

    const entry = new Entry({
      title: req.body.title,
      link: req.body.link,
      githubLink: req.body.githubLink,
      description: req.body.description,
      youtubeLink: req.body.youtubeLink,
      img: { data: data[0].data, contentType }
    })

    entry.save().then((data) => {
      res.status(200).send(data)
    }, (e) => {
      res.send(e)
    })
  })

  app.get('/api/api/:id', (req, res) => {
    const title = req.params.id

    Entry.findOne({
      title
    }).then((data) => {
      res.send(data)
    })
  })

  app.delete('/api/api/:id', authenticate, (req, res) => {
    const _id = req.params.id

    Entry.findOneAndRemove({
      _id
    })
      .then(() => Entry.find({}).then((data) => { res.status(200).send(data) }))
  })

  app.patch('/api/api/:id', authenticate, (req, res) => {
    const _id = req.params.id

    Entry.findByIdAndUpdate({
      _id
    },
    {
      $set: req.body
    }).then(() => {
      Entry.find({}).then(data => res.send(data))
    })
  })

  app.post('/projectOrder', authenticate, (req, res) => {
    Promise.all([req.body.order.map(item => {
      Entry.findOneAndUpdate({ _id: item.id }, { $set: { orderNum: item.orderNum } }, { new: true }).then((data) => console.log('data', data))
    })
    ]).then(() => res.sendStatus(200))
  })

  app.post('/img-compress', (req, res) => {
    Entry.find({}).then(data => {
      async function min (i) {
        // turn buffer into file
        fs.appendFileSync(path.join(__dirname, i + '.png'), new Buffer(data[i].img.data))

        const files = await
        imagemin([__dirname + '/' + i + '.png'], 'build/images', {
          plugins: [
            imageminJpegtran(),
            imageminPngquant({ quality: '65-80' })
          ]
        })
        Entry.findOneAndUpdate({ _id: data[i]._id }, {
          $set: { img: { data: files[0].data, contentType: 'img/png' } }
        }).then(() => {
          if (i + 1 === data.length) {
            const images = fs.readdirSync(__dirname + '/build/images')
            images.map(image => {
              fs.unlinkSync(__dirname + `/build/images/${image}`)
              fs.unlinkSync(__dirname + `/${image}`)
            })

            console.log('i', i)
            res.sendStatus(200)
          } else {
            console.log(i)
            min(i += 1)
          }
        })
      }
      min(0)
    })
  })

  app.get('/dlImages', (req, res) => {
    Entry.find({}).then((data) => {
      data.map(({ img, title }) => {
        fs.writeFileSync(`temp/${title}.jpeg`, Buffer.from(img.data, 'base64'))
      })
    })
  })
}
