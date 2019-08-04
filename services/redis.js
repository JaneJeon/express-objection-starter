const Redis = require("ioredis")
const log = require("./logger")

const defaultInstance = new Redis(process.env.REDIS_URL)
const publisherInstance = new Redis(process.env.REDIS_URL)
const subscriberInstance = new Redis(process.env.REDIS_URL)

// ioredis eats up errors by default
defaultInstance.on("error", err => log.error({ err }, "Redis error"))
publisherInstance.on("error", err => log.error({ err }, "Redis error"))
subscriberInstance.on("error", err => log.error({ err }, "Redis error"))

module.exports = defaultInstance
module.exports.pub = publisherInstance
module.exports.sub = subscriberInstance
