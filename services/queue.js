const Bull = require("bull")
const { pub, sub } = require("./redis")

module.exports = new Bull("queue", {
  createClient: function(type) {
    switch (type) {
      case "client":
        return pub
      case "subscriber":
        return sub
      default:
        return new Redis(process.env.REDIS_URL)
    }
  }
})
