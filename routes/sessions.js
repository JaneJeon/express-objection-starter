const { Router } = require("express")
const passport = require("passport")

module.exports = Router()
  .get("/login", (req, res) => res.render("login", { title: "Login" }))
  .post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })
  )
  .get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
  })
