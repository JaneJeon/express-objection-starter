const pino = require('pino')
const config = require('../config')

// https://github.com/fastify/fastify/blob/master/lib/logger.js
const serializers = {
  req: req => ({
    id: req.id,
    method: req.method,
    url: req.url,
    user: req.user
  }),
  res: res => ({
    statusCode: res.statusCode,
    statusMessage: res.statusMessage
  })
}

const logger = pino(
  Object.assign(config.get('logger:options'), { serializers }),
  config.get('logger:destination')
).child({ boot: config.get('boot') })

process.on(
  'uncaughtException',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.fatal(err, 'uncaughtException')
    process.exit(1)
  })
)

process.on(
  'unhandledRejection',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.fatal(err, 'unhandledRejection')
    process.exit(1)
  })
)

module.exports = logger
