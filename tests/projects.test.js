const expect = require('expect')
const request = require('supertest')
const { app } = require('./../server')
const { Entry } = require('./../models/entry')
const { entries, users } = require('./seed/seed')

describe('GET /api/projects', () => {
  it('should get all project entries', (done) => {
    request(app)
      .get('/api/projects')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /api/projects/:id', () => {
  it('should fetch desired project', (done) => {
    request(app)
      .get(`/api/projects/${entries[0]._id}`)
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
      .post('/api/projects')
      .set('x-auth', users[0].tokens[0].token)
      .send({
        title: 'hello',
        description: 'test',
        link: 'test',
        githubLink: 'ok',
        img: 'https://images.unsplash.com/photo-1577992443472-c9a4f44e8172?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(3)
        expect(res.body.some(project => project.title === 'hello')).toBeTruthy()
      })
      .end(done)
  })
})

describe('PATCH /api/projects', () => {
  it('should edit an existing project entry', (done) => {
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    request(app)
      .patch(`/api/projects/${entries[0]._id}`)
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

describe('DELETE /api/projects', () => {
  it('should delete a project entry', (done) => {
    request(app)
      .delete(`/api/projects/${entries[0]._id}`)
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
