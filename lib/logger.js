const pino = require("pino")

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

const logger = (() => {
  switch (process.env.NODE_ENV) {
    case "development":
      return pino({
        level: "debug",
        prettyPrint: { translateTime: true, ignore: "pid,hostname,boot" },
        serializers
      })
    case "test":
      return pino(
        {
          level: "debug",
          prettyPrint: { translateTime: true, ignore: "pid,hostname,boot" },
          serializers
        },
        `./logs/test-${new Date().toLocaleString()}.log`
      )
    default:
      return pino({ serializers })
  }
})()

if (process.env.LOG_LEVEL) logger.level = process.env.LOG_LEVEL

process.on(
  "uncaughtException",
  pino.final(logger, (err, finalLogger) => {
    finalLogger.fatal(err, "uncaughtException")
    process.exit(1)
  })
)

process.on(
  "unhandledRejection",
  pino.final(logger, (err, finalLogger) => {
    finalLogger.fatal(err, "unhandledRejection")
    process.exit(1)
  })
)

module.exports = logger.child({ boot: new Date() })
