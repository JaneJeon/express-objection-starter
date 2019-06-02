module.exports = require("cookie-session")({
  keys: [process.env.SESSION_SECRET],
  sameSite: "lax"
})
