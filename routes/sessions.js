const { Router } = require("express")
const passport = require("passport")

module.exports = Router()
  .post("/login", passport.authenticate("local"), (req, res) =>
    res.status(201).send(req.user)
  )
  .delete("/logout", (req, res) => {
    req.logout()
    res.sendStatus(204)
  })
