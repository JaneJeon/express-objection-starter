const nodemailer = require('nodemailer')
const config = require('../config')
const logger = require('./logger')

const transport = nodemailer.createTransport(
  Object.assign(config.get('mail:smtp'), { logger }),
  config.get('mail:defaults')
)

transport.verify()

module.exports = transport
