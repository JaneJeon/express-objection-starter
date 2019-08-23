const nodemailer = require('nodemailer')
const config = require('../config')
const logger = require('./logger')

const transporter = nodemailer.createTransport(
  Object.assign(config.get('mail:smtp'), { logger }),
  config.get('mail:defaults')
)

transporter.verify()

module.exports = transporter
