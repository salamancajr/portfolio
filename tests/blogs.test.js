const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')
const { blogs } = require('./seed/seed')

xdescribe('GET /blog', () => {
  xit('should get all blogs', (done) => {
    request(app)
      .get('/api/blog')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2)
        expect(res.body[0].title).toBe('Test blog')
        expect(res.body[1].title).toBe('Test blog2')
      })
      .end(done)
  })
})

describe('GET /blog/:id', () => {
  it('should return a specific blog', (done) => {
    request(app)
      .get(`/api/blog/${blogs[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toEqual('test text')
      })
      .end(done)
  })
})
