const expect = require('expect')
const request = require('supertest')
const { app } = require('./../server')
const { Entry } = require('./../models/entry')
const { entries, users } = require('./seed/seed')
const fs = require('fs')
const path = require('path')

describe('GET /api', () => {
  it('should get all project entries', (done) => {
    request(app)
      .get('/api/blog')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /api/api/:id', () => {
  it('should fetch desired project', (done) => {
    request(app)
      .get(`/api/api/${entries[0].title}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(entries[0].title)
      })
      .end(done)
  })
})

describe('POST /api', () => {
  it('should create a new project entry', (done) => {
    request(app)
      .post('/api/api')
      .set('x-auth', users[0].tokens[0].token)
      .field({
        title: 'hello',
        description: 'test',
        link: 'test',
        githubLink: 'ok'
      })
      .attach('avatar', './blogUploads/test.png')
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe('hello')
        expect(res.body.img.contentType).toBe('image/png')
      })
      .end(() => {
        const uploads = fs.readdirSync('./uploads')
        uploads.map(file => fs.unlinkSync(path.join('./uploads', file)))
        done()
      })
  })
})

describe('PATCH /api', () => {
  it('should edit an existing project entry', (done) => {
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    request(app)
      .patch(`/api/api/${entries[0]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({ title: randomString })
      .expect(200)
      .end(done)
      .expect(() => {
        Entry.findById(entries[0]._id).then((data) => {
          expect(data.title).toBe(randomString)
        })
      })
  })
})

describe('DELETE /api', () => {
  it('should delete a project entry', (done) => {
    request(app)
      .delete(`/api/api/${entries[0]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(() => {
        Entry.findById(entries[0]._id).then((data) => {
          expect(data).toBe(null)
        })
      })
      .end(done)
  })
})
