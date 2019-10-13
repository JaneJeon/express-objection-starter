const config = require('../config')
const log = require('../lib/logger')

let accessLogger
try {
  accessLogger = require('morgan')(config.get('logger:access:format'), {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: msg => log.info(msg.trimRight()) }
  })
} catch (err) {
  accessLogger = (req, res, next) => next()
}

module.exports = accessLogger
