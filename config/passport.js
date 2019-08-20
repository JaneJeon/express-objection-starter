const passport = require('passport')
const User = require('../models/user')
const { NotFoundError } = require('objection')
const { Strategy: LocalStrategy } = require('passport-local')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  done(null, await User.query().findById(id))
})

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.query().findByUsername(username.toLowerCase())
      ;(await user.verifyPassword(password))
        ? done(null, user)
        : done(null, false)
    } catch (err) {
      err instanceof NotFoundError ? done(null, false) : done(err)
    }
  })
)
