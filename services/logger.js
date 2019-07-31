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

module.exports = logger
