let nextReqId = 0
const maxInt = 2147483647

// https://github.com/fastify/fastify/blob/master/lib/reqIdGenFactory.js
module.exports = () => (nextReqId = (nextReqId + 1) & maxInt)
