const Redis = require("ioredis")

const defaultInstance = new Redis(process.env.REDIS_URL)
const publisherInstance = new Redis(process.env.REDIS_URL)
const subscriberInstance = new Redis(process.env.REDIS_URL)

// ioredis eats up errors by default
defaultInstance.on("error", err => {
  throw err
})
publisherInstance.on("error", err => {
  throw err
})
subscriberInstance.on("error", err => {
  throw err
})

module.exports = defaultInstance
module.exports.pub = publisherInstance
module.exports.sub = subscriberInstance
