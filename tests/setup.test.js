const { populateEntries, populateUsers, populateBlogs } = require('./seed/seed')
const { redisClient } = require('../redis')

beforeEach(() => redisClient.flushall())
beforeEach(populateEntries)
beforeEach(populateUsers)
beforeEach(populateBlogs)
