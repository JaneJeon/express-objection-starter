require("express-async-errors")
require("./config/env")
require("./config/passport")

const express = require("express")
const app = express()
require("express-ws")(app)

const passport = require("passport")

// the app should be running behind proxy in production,
// and the logger should shut up during tests
if (process.env.NODE_ENV == "development") app.use(require("morgan")("dev"))

app
  .set("trust proxy", process.env.NODE_ENV == "production")
  .use(require("helmet")())
  .use(require("cors")({ origin: true }))
  .use(require("./config/session"))
  .use(express.json())
  .use(require("express-query-boolean")())
  .use(passport.initialize())
  .use(passport.session())
  .use(require("./config/ratelimit"))
  .use(require("./routes"))
  .use((req, res, next) => res.sendStatus(404))
  .use(require("./config/error"))
  .listen(process.env.PORT, err => {
    if (err) console.error(err)
    require("./services/debug")("server")("running on port", process.env.PORT)
  })

module.exports = app
