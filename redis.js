const redis = require('redis')
const util = require('util')

const redisClient = redis.createClient(process.env.REDIS_URL)
redisClient.get = util.promisify(redisClient.get)
redisClient.hget = util.promisify(redisClient.hget)

module.exports = { redisClient }
