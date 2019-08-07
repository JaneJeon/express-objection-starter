const logger = require("../lib/logger")

let accessLogger
try {
  accessLogger = require("morgan")("dev")
} catch (err) {
  accessLogger = (req, res, next) => next() // noop
}

module.exports = (req, res, next) => {
  req.log = logger.child({ req: { id: req.id } })
  accessLogger(req, res, next)
}
