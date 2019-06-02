const debug = require("debug")
const appName = "app"

module.exports = scope =>
  scope ? debug(`${appName}:${scope}`) : debug(appName)
