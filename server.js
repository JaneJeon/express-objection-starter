require("express-async-errors")
require("dotenv-defaults").config()
require("./config/passport")

const passport = require("passport")
const express = require("express")
const app = express()
require("express-ws")(app)

app
  .set("trust proxy", process.env.NODE_ENV == "production")
  .use(require("./middlewares/request-id"))
  .use(require("./middlewares/request-logger"))
  .use(require("helmet")())
  .use(require("cors")({ origin: true }))
  .use(require("./middlewares/session"))
  .use(require("csurf")({ cookie: true }))
  .use((req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken())
    next()
  })
  .use(require("./middlewares/ratelimiter"))
  .use(express.json())
  .use(require("express-query-boolean")())
  .use(passport.initialize())
  .use(passport.session())
  .use(require("./routes"))
  .use((req, res, next) => res.sendStatus(404))
  .use(require("./middlewares/error-handler"))
  .listen(process.env.PORT, err => {
    if (err) throw err
    require("./lib/logger").info("Server listening on port", process.env.PORT)
  })
  .setTimeout(process.env.TIMEOUT_SECONDS * 1000)

module.exports = app
