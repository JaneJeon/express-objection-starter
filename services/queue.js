const Bull = require("bull")
const { default: defaultInstance, pub, sub } = require("./redis")

module.exports = new Bull("queue", {
  createClient: function(type) {
    switch (type) {
      case "client":
        return pub
      case "subscriber":
        return sub
      default:
        return defaultInstance
    }
  }
})
