const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { redisClient } = require('../redis')

const expirationTime = 60 * 60 * 24 * 7

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  img: {
    type: String,
    required: true
  },
  likes: {
    type: Array,
    default: null
  },
  time: {
    type: String,
    required: true
  },
  orderNum: {
    type: Number,
    default: 0
  }
})

BlogSchema.statics.removeAndReduceByOne = function (_id) {
  const Blog = this

  return Blog.findById(_id).then((data) => {
    return data.orderNum
  }).then((data) => {
    return Promise.all([Blog.updateMany({ orderNum: { $gt: data } }, { $inc: { orderNum: -1 } }),
      Blog.findOneAndRemove({ _id })])
  })
}

BlogSchema.statics.findAndCacheResponse = function (res) {
  const Blog = this

  return Blog.find().sort({ orderNum: +1 }).then(data => {
    if (res) {
      res.send(data)
    }
    redisClient.set('blogs', JSON.stringify(data), 'EX', expirationTime)
    return data
  })
}

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = { Blog }
