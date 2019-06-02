const { Router } = require("express")

module.exports = Router()
  .use((req, res, next) => {
    res.locals.user = req.user
    next()
  })
  .get("/", (req, res) => res.render("index", { title: "App" }))
  .use("/", require("./sessions"))
  .use("/users", require("./users"))
