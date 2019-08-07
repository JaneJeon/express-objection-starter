require("express-async-errors")
require("dotenv-defaults").config()
require("./config/passport")

const passport = require("passport")
const express = require("express")
const app = express()
require("express-ws")(app)

if (process.env.NODE_ENV != "production") app.use(require("morgan")("dev"))
const log = require("./services/logger")
const reqIdGen = require("./lib/req-id-gen")

app
  .set("trust proxy", process.env.NODE_ENV == "production")
  .use((req, res, next) => {
    req.id = req.header("X-Request-Id") || reqIdGen()
    req.log = log.child({ req: { id: req.id } })
    next()
  })
  .use(require("helmet")())
  .use(require("cors")({ origin: true }))
  .use(require("./config/session"))
  .use(require("csurf")({ cookie: true }))
  .use((req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken())
    next()
  })
  .use(require("./config/ratelimit"))
  .use(express.json())
  .use(require("express-query-boolean")())
  .use(passport.initialize())
  .use(passport.session())
  .use(require("./routes"))
  .use((req, res, next) => res.sendStatus(404))
  .use(require("./config/error-handler"))
  .listen(process.env.PORT, err => {
    if (err) throw err
    log.info("Server listening on port", process.env.PORT)
  })
  .setTimeout(process.env.TIMEOUT_SECONDS * 1000)

module.exports = app
