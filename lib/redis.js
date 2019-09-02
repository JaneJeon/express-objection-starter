const Redis = require('ioredis')
const config = require('../config')
const log = require('./logger')

const defaultInstance = new Redis(config.get('redis:url'))
const publisherInstance = new Redis(config.get('redis:url'))
const subscriberInstance = new Redis(config.get('redis:url'))

// ioredis eats up errors by default
defaultInstance.on('error', err => log.error(err, 'Redis error'))
publisherInstance.on('error', err => log.error(err, 'Redis error'))
subscriberInstance.on('error', err => log.error(err, 'Redis error'))

module.exports = defaultInstance
module.exports.pub = publisherInstance
module.exports.sub = subscriberInstance
module.exports.createClient = type => {
  switch (type) {
    case 'client':
      return publisherInstance
    case 'subscriber':
      return subscriberInstance
    default:
      return defaultInstance
  }
}
