const { Router } = require("express")
const User = require("../models/user")
const { ensureIsSignedIn, ensureIsAdminOrSelf } = require("../lib/middlewares")

module.exports = Router()
  .get("/new", (req, res) => res.render("signup", { title: "Signup" }))
  .get("/:userId", async (req, res) => {
    //
  })
  .get("/:userId/edit")
  .post("/", async (req, res) => {
    User.filterPost(req.body)
  })
  .patch(
    "/:userId",
    ensureIsSignedIn,
    ensureIsAdminOrSelf,
    async (req, res) => {
      User.filterPatch(req.body)
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
