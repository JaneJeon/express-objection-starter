const debug = require("debug")
const appName = "app"

module.exports = scope => debug(`${appName}:${scope}`)
