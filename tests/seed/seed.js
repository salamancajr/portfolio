const { ObjectID } = require('mongodb')
const fs = require('fs')
const { Blog } = require('./../../models/blog')
const { Entry } = require('./../../models/entry')
const { User } = require('./../../models/users')
const jwt = require('jsonwebtoken')
const path = require('path')
const userId = new ObjectID()

const users = [{
  _id: userId,
  email: 'testing@gmail.com',
  password: '123abc',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userId, access: 'auth' }, process.env.JWT_SECRET).toString()
  }]
}]

const entries = [{
  _id: new ObjectID(),
  title: 'First Test',
  link: 'www.test.com',
  githubLink: 'www.test2.com',
  description: 'This is a test description',
  img: 'https://images.unsplash.com/photo-1577992443472-c9a4f44e8172?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
}, {
  _id: new ObjectID(),
  title: 'Second Test',
  link: 'www.secondtest.com',
  githubLink: 'www.secondtest2.com',
  description: 'This is a second test description',
  img: 'https://images.unsplash.com/photo-1577992443472-c9a4f44e8172?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
}]

const blogs = [{
  _id: new ObjectID(),
  title: 'Test blog',
  text: 'test text',
  time: '12:00pm 12/12/2012',
  img: 'https://images.unsplash.com/photo-1577992443472-c9a4f44e8172?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  orderNum: 0
}, {
  _id: new ObjectID(),
  title: 'Test blog2',
  text: 'test text2',
  time: '12:00pm 12/12/2012',
  img: 'https://images.unsplash.com/photo-1577992443472-c9a4f44e8172?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  orderNum: 1

}

]

const populateEntries = (done) => {
  fs.truncate(path.join(__dirname, 'uploads'), 0, function () { console.log('done') })
  Entry.deleteMany({}).then(() => {
    return Entry.insertMany(entries)
  }).then(() => done())
}

const populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    var userOne = new User(users[0]).save()
    return Promise.all([userOne])
  }).then(() => done())
}

const populateBlogs = (done) => {
  Blog.deleteMany({}).then(() => {
    return Blog.insertMany(blogs)
  }).then(() => done())
}

module.exports = { entries, populateEntries, users, populateUsers, blogs, populateBlogs }
