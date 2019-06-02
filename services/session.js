const session = require("express-session")
const RedisStore = require("connect-redis")(session)
const client = require("./redis")

module.exports = session({
  store: new RedisStore({ client }),
  secret: process.env.SESSION_SECRET,
  cookie: { sameSite: "lax" },
  resave: false,
  saveUninitialized: false
})
