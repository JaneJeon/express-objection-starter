const session = require("express-session")
const RedisStore = require("connect-redis")(session)
const client = require("../services/redis")
const nanoid = require("nanoid/non-secure")
const logger = require("../services/logger")

module.exports = session({
  store: new RedisStore({ client, logErrors: logger }),
  secret: process.env.SESSION_SECRET,
  cookie: {
    sameSite: "lax", // CSRF protection
    maxAge: process.env.SESSION_MAXAGE_SECONDS * 1000
  },
  resave: false,
  rolling: true,
  saveUninitialized: false, // GDPR compliance
  // this is to allow search by user id
  // see: https://github.com/jaredhanson/passport/blob/master/lib/sessionmanager.js#L21
  genid: req => `${req._passport.session.user.id}:${nanoid(10)}`
})
