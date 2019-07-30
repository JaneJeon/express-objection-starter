require("express-async-errors")
require("dotenv-defaults").config()
require("./config/passport")

const passport = require("passport")
const express = require("express")
const app = express()
require("express-ws")(app)

const log = require("./services/logger")
// TODO: this feels dirty. Any way to swap this out?
if (process.env.NODE_ENV != "production")
  app.use(
    // request logger
    require("morgan")(process.env.NODE_ENV == "development" ? "dev" : "tiny", {
      stream: { write: message => logger.info(message.trim()) }
    })
  )

// TODO: clean up on aisle 6
const nanoid = require("nanoid/non-secure")

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
  .use((req, res, next) => {
    req.log = log.child({ id: `req:${nanoid(10)}` })
    next()
  })
  .use(require("./routes"))
  .use((req, res, next) => res.sendStatus(404))
  .use(require("./config/error"))
  .listen(process.env.PORT, err => {
    if (err) log.error(err)
    log.info("Server listening on port", process.env.PORT)
  })

module.exports = app
