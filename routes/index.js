const { Router } = require("express")

module.exports = Router()
  .use("/", require("./sessions"))
  .use("/users", require("./users"))
