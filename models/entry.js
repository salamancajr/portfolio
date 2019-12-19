var mongoose = require('mongoose')

var Entry = mongoose.model('Entry', {
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
  img: String,
  youtubeLink: {
    type: 'string',
    minlength: 4,
    default: 'no link'
  },
  orderNum: {
    type: Number

  }
})

module.exports = { Entry }
