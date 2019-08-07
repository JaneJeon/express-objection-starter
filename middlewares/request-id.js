let nextReqId = 0
const maxInt = 2147483647

const reqIdHeader = require('../config').get('requestIdHeader')

// https://github.com/fastify/fastify/blob/master/lib/reqIdGenFactory.js
module.exports = (req, res, next) => {
  req.id = req.header(reqIdHeader) || (nextReqId = (nextReqId + 1) & maxInt)
  next()
}
