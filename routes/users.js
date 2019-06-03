const { Router } = require("express")
const User = require("../models/user")
const { ensureIsSignedIn, ensureIsAdminOrSelf } = require("../lib/middlewares")

module.exports = Router()
  .get("/new", (req, res) => res.render("users/new", { title: "Signup" }))
  .get("/:userId", async (req, res) => {
    res.locals.user = await User.query().findById(req.params.userId)
    res.render("users/show", { title: `${req.params.userId}'s account` })
  })
  .get("/:userId/edit", ensureIsSignedIn, ensureIsAdminOrSelf, (req, res) => {
    res.locals.userId = req.params.userId

    res.render("users/edit", { title: "Update profile" })
  })
  .post("/", async (req, res) => {
    User.filterPost(req.body)

    const user = await User.query().insert(req.body)

    req.login(user, err => {
      if (err) throw err
      res.redirect(`/users/${user.username}`)
    })
  })
  .patch(
    "/:userId",
    ensureIsSignedIn,
    ensureIsAdminOrSelf,
    async (req, res) => {
      User.filterPatch(req.body)

      await req.user.$query().patch(req.body)

      res.redirect(`/users/${req.params.userId}`)
    }
  )
  .delete(
    "/:userId",
    ensureIsSignedIn,
    ensureIsAdminOrSelf,
    async (req, res) => {
      await User.query().deleteById(req.params.userId)

      res.redirect("/")
    }
  )
