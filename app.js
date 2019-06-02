require("express-async-errors")
require("./services/env")
require("./services/passport")

const express = require("express")
const app = express()
require("express-ws")(app)

const path = require("path")
const createError = require("http-errors")
const passport = require("passport")

// the app should be running behind proxy in production,
// and the logger should shut up during tests
if (process.env.NODE_ENV == "development") app.use(require("morgan")("dev"))

app
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "hbs")
  .set("trust proxy", process.env.NODE_ENV == "production")
  .use(require("helmet")())
  .use(require("./services/session"))
  .use(require("connect-flash")())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, "public")))
  .use(passport.initialize())
  .use(passport.session())
  .use(require("./services/ratelimit"))
  .use(require("./routes"))
  .use((req, res, next) => next(createError(404))) // catch 404
  .use(require("./services/error"))
  .listen(process.env.PORT, err => {
    if (err) console.error(err)
    require("./services/debug")("server")("running on port", process.env.PORT)
  })

module.exports = app
