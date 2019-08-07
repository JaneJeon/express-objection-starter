let nextReqId = 0
const maxInt = 2147483647

const config = require('../config')

// https://github.com/fastify/fastify/blob/master/lib/reqIdGenFactory.js
module.exports = (req, res, next) => {
  req.id =
    req.header(config.get('requestIdHeader')) ||
    (nextReqId = (nextReqId + 1) & maxInt)
  next()
}
