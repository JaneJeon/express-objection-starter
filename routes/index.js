const { Router } = require("express")

module.exports = Router()
  .get("/", (req, res) => res.render("index"))
  .get("/about")
  .get("/signup")
  .use("/", require("./sessions"))
  .use("/users", require("./users"))
