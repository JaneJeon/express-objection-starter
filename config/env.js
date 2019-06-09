const path = require("path")

if (!process.env.SESSION_SECRET)
  require("dotenv-defaults").config({
    path: path.join(__dirname, "..", ".env"),
    defaults: path.join(__dirname, "..", ".env.defaults")
  })
