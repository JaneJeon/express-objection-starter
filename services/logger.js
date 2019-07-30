const winston = require("winston")

let level, format, transports

const customFormat = winston.format.printf(info => {
  let { level, message, timestamp, id, stack, ...rest } = info

  // when an error object is passed directly, just print the stack!
  message = stack || message

  // passed from winston.format.timestamp()
  timestamp = timestamp ? `[${timestamp}] ` : ""

  // tracing
  id = id ? ` ID=${id}` : ""

  // just stringify all other properties
  rest = JSON.stringify(rest)
  rest = rest == "{}" ? "" : `\n${rest}`

  return `${timestamp}${level}${id} ${message}${rest}`
})

switch (process.env.NODE_ENV) {
  case "development":
    level = "debug"
    format = winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.splat(),
      customFormat
    )
    transports = [new winston.transports.Console({ level })]
    break
  case "test":
    require("winston-daily-rotate-file")
    level = "debug"
    format = winston.format.combine(
      winston.format.timestamp(),
      winston.format.splat(),
      customFormat
    )
    transports = [
      new winston.transports.Console({ level: "error" }),
      new winston.transports.DailyRotateFile({
        level,
        dirname: "logs",
        filename: "test-%DATE%.log"
      })
    ]
    break
  default:
    level = "info"
    format = winston.format.combine(winston.format.splat(), customFormat)
    transports = [
      new winston.transports.Console({ stderrLevels: ["error", "warn"] })
    ]
    break
}

module.exports = winston.createLogger({
  level: process.env.LOG_LEVEL || level, // LOG_LEVEL takes precedence
  transports,
  format
})
