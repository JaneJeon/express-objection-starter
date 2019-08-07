const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const client = require('../lib/redis')
const nanoid = require('nanoid/non-secure')
const config = require('../config')

module.exports = session(
  Object.assign(config.get('session'), {
    store: new RedisStore({ client }),
    // this is to allow search by user id
    // see: https://github.com/jaredhanson/passport/blob/master/lib/sessionmanager.js#L21
    genid: req => `${req._passport.session.user.id}:${nanoid(10)}`
  })
)
