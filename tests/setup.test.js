const { populateEntries, populateUsers, populateBlogs } = require('./seed/seed')

beforeEach(populateEntries)
beforeEach(populateUsers)
beforeEach(populateBlogs)
