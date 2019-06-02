const { Router } = require("express")

module.exports = Router()
  .get("/", (req, res) => res.render("index", { title: "App" }))
  .use("/", require("./sessions"))
  .use("/users", require("./users"))
