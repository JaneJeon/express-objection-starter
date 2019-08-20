const passport = require('passport')
const User = require('../models/user')
const { NotFoundError } = require('objection')
const { Strategy: LocalStrategy } = require('passport-local')

// TODO: figure out what to include
passport.serializeUser((user, done) => done(null, user.username))
passport.deserializeUser((username, done) => {
  done(null, User.fromJson({ username }, { skipValidation: true }))
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
