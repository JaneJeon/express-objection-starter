const { Router } = require("express")
const User = require("../models/user")

module.exports = Router()
  .param("username", async (req, res, next, username) => {
    req.requestedUser =
      req.user && req.user.username == username.toLowerCase()
        ? req.user
        : await User.query().findByUsername(username)

    next()
  })
  .get("/", (req, res) => res.sendStatus(200))
  .use("/", require("./sessions"))
  .use("/", require("./users"))
