const Redis = require("ioredis")

const defaultInstance = new Redis(process.env.REDIS_URL)
const subscriberInstance = new Redis(process.env.REDIS_URL)
subscriberInstance.subscribe("chat", err => {
  if (err) console.error(err)
})

module.exports = defaultInstance
module.exports.pub = defaultInstance
module.exports.sub = subscriberInstance
