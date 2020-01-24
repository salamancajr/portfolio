const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { redisClient } = require('../redis')

const expirationTime = 60 * 60 * 24 * 7

const EntrySchema = new Schema({
  title: {
    type: 'string',
    required: true,
    minlength: 1,
    trim: true
  },
  link: {
    type: 'string',
    required: true,
    minlength: 1,
    trim: true
  },
  githubLink: {
    type: 'string',
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: 'string',
    required: true,
    minlength: 1,
    trim: true
  },
  img: {
    type: 'string',
    required: true
  },
  youtubeLink: {
    type: 'string',
    minlength: 4,
    default: 'no link'
  },
  orderNum: {
    type: Number
  }
})

EntrySchema.statics.findAndCacheResponse = function (res) {
  var Entry = this

  return Entry.find().sort({ orderNum: +1 }).then(data => {
    if (res) {
      res.send(data)
    }
    redisClient.set('projects', JSON.stringify(data), 'EX', expirationTime)
    return data
  })
}

const Entry = mongoose.model('Entry', EntrySchema)

module.exports = { Entry }
