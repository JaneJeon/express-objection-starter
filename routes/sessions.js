const { Router } = require("express")
const passport = require("passport")
const redis = require("../services/redis")
const pick = require("lodash/pick")
const { ensureIsSignedIn } = require("../middlewares/auth")
const parser = require("ua-parser-js")

module.exports = Router()
  .post("/login", passport.authenticate("local"), (req, res) => {
    if (req.body.rememberMe)
      req.session.cookie.maxAge = +process.env.SESSION_REMEMBERME_MAXAGE_SECONDS

    const ua = parser(
      req.headers["x-ucbrowser-ua"] || req.headers["user-agent"]
    )
    const now = new Date()

    req.session.ip = req.ip
    req.session.browser = ua.browser.name
    req.session.os = ua.os.name
    req.session.device = ua.device.type
    req.session.createdAt = req.session.createdAt || now
    req.session.updatedAt = now

    res.status(201).send(req.user)
  })
  .delete("/logout", (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err)

      res.sendStatus(204)
      next()
    })
  })
  .use(ensureIsSignedIn)
  .get("/sessions", async (req, res) => {
    const sessPrefix = req.user.getSession()
    const sessPattern = req.user.getSession("*")
    const keys = new Set()

    // SCAN all sessions belonging to a user
    const scan = async cursor => {
      const result = await redis.scan(cursor, "match", sessPattern)
      result[1].forEach(key => keys.add(key))
      if (result[0] != 0) return scan(result[0])
    }
    await scan(0)

    const result = await redis.mget([...keys])
    const sessions = result
      .filter(x => x)
      .map(sess =>
        Object.assign(pick(sess, ["id", "ip", "useragent"]), {
          self: sess.id == req.session.id,
          id: sess.id.substr(sessPrefix.length)
        })
      )

    res.send(sessions)
  })
  .delete("/sessions/:sessId", async (req, res) => {
    await redis.del(req.user.getSession(req.params.sessId))

    res.sendStatus(204)
  })
// TODO: "last accessed on"
