const pino = require('pino')
const config = require('../config')
const pick = require('lodash/pick')

const logger = pino(
  Object.assign(config.get('logger:options'), {
    serializers: {
      err: pino.stdSerializers.err,
      req: req => pick(req, config.get('logger:serializers').req),
      res: res => pick(res, config.get('logger:serializers').res)
    }
  })
)

// http://getpino.io/#/docs/api?id=pino-final
if (!config.get('logger:options:prettyPrint'))
  process
    .on(
      'uncaughtException',
      pino.final(logger, (err, finalLogger) => {
        finalLogger.fatal(err, 'uncaughtException')
        process.exit(1)
      })
    )
    .on(
      'unhandledRejection',
      pino.final(logger, (err, finalLogger) => {
        finalLogger.fatal(err, 'unhandledRejection')
        process.exit(1)
      })
    )

module.exports = logger
