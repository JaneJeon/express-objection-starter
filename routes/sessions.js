const { Router } = require("express")
const passport = require("passport")

module.exports = Router()
  .post("/login", passport.authenticate("local"))
  .delete("/logout", (req, res) => {
    req.logout()
    res.sendStatus(204)
  })
