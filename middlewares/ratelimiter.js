const rateLimit = require('express-rate-limit')
const RedisStore = require('rate-limit-redis')
const client = require('../lib/redis')
const config = require('../config')

module.exports = rateLimit(
  Object.assign(config.get('ratelimit'), {
    store: new RedisStore({ client }),
    keyGenerator: req => (req.user || {}).id || req.ip
  })
)
