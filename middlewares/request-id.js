let nextReqId = 0
const maxInt = 2147483647

// https://github.com/fastify/fastify/blob/master/lib/reqIdGenFactory.js
module.exports = (req, res, next) => {
  req.id =
    req.header(process.env.REQUEST_ID_HEADER) ||
    (nextReqId = (nextReqId + 1) & maxInt)
  next()
}
