const rateLimit = require("express-rate-limit")
const RedisStore = require("rate-limit-redis")
const client = require("./redis")

module.exports = rateLimit({
  windowMs: process.env.RATELIMIT_WINDOW_MS,
  max: process.env.NODE_ENV == "production" ? process.env.RATELIMIT_MAX : 0,
  store: new RedisStore({ client })
})
