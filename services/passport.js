const passport = require("passport")
const User = require("../models/user")
const { NotFoundError } = require("objection")
const { Strategy: LocalStrategy } = require("passport-local")

passport.serializeUser((user, done) => done(null, user.username))
passport.deserializeUser(async (id, done) => {
  try {
    done(null, await User.query().findById(id))
  } catch (err) {
    err instanceof NotFoundError ? done(null, false) : done(err)
  }
})

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.query().findById(username.toLowerCase())
      ;(await user.verifyPassword(password))
        ? done(null, user)
        : done(null, false, { message: "Incorrect password!" })
    } catch (err) {
      err instanceof NotFoundError
        ? done(null, false, { message: "Invalid username!" })
        : done(err)
    }
  })
)
