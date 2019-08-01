const pino = require("pino")

const logger = (() => {
  switch (process.env.NODE_ENV) {
    case "development":
      return pino({ level: "debug", prettyPrint: { translateTime: true } })
    case "test":
      return pino(
        { level: "debug", prettyPrint: { translateTime: true } },
        `./logs/test-${new Date().toLocaleString()}.log`
      )
    default:
      return pino({ useLevelLabels: true })
  }
})()

if (process.env.LOG_LEVEL) logger.level = process.env.LOG_LEVEL

process.on(
  "uncaughtException",
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, "uncaughtException")
    process.exit(1)
  })
)

process.on(
  "unhandledRejection",
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, "unhandledRejection")
    process.exit(1)
  })
)

module.exports = logger
