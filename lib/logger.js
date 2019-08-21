const pino = require('pino')
const config = require('../config')
const pick = require('lodash/pick')

const serializerFields = config.get('logger:serializers')

// https://github.com/fastify/fastify/blob/master/lib/logger.js
const serializers = {
  req: req => pick(req, serializerFields.req),
  res: res => pick(res, serializerFields.res),
  err: pino.stdSerializers.err
}

const logger = pino(
  Object.assign(config.get('logger:options'), { serializers }),
  config.get('logger:destination')
).child({ boot: new Date() })

if (!config.get('logger:destination')) {
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
}

module.exports = logger
