const passport = require("passport")
const User = require("../models/user")
const { Strategy: LocalStrategy } = require("passport-local")

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  try {
    done(null, await User.query().findById(id))
  } catch (err) {
    done(err)
  }
})

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.query().findById(username.toLowerCase())
      if (!user) return done(null, false, { message: "Invalid username!" })
      ;(await user.verifyPassword(password))
        ? done(null, user)
        : done(null, false, { message: "Incorrect password!" })
    } catch (err) {
      done(err)
    }
  })
)
