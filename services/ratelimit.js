const rateLimit = require("express-rate-limit")
const RedisStore = require("rate-limit-redis")
const client = require("./redis")

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV == "production" ? 100 : 1000000,
  store: new RedisStore({ client })
})
