const redis = require('./redis')
const nanoid = require('nanoid')

exports.generate = async (prefix, value = 1, expires = 86400000) => {
  const token = nanoid()
  await redis.psetex(`${prefix}:${token}`, expires, value)

  return token
}

exports.consume = async (prefix, token) => {
  const key = `${prefix}:${token}`

  const results = await redis
    .pipeline()
    .get(key)
    .del(key)
    .exec()

  // https://github.com/luin/ioredis/#pipelining
  return results[0][1]
}
