const rateLimit = require("express-rate-limit")
const RedisStore = require("rate-limit-redis")
const client = require("../lib/redis")

module.exports = rateLimit({
  windowMs: process.env.RATELIMIT_WINDOW_SECONDS * 1000,
  max: process.env.NODE_ENV == "production" ? process.env.RATELIMIT_MAX : 0,
  store: new RedisStore({ client }),
  keyGenerator: req => (req.user || {}).id || req.ip
})
