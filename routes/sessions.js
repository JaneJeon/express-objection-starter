const { Router } = require("express")
const passport = require("passport")

module.exports = Router()
  .post("/login", passport.authenticate("local"), (req, res) =>
    res.status(201).send(req.user)
  )
  .delete("/logout", (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err)

      res.sendStatus(204)
      next()
    })
  })
