const nodemailer = require('nodemailer')
const logger = require('./logger')

const auth =
  process.env.SMTP_USERNAME && process.env.SMTP_PASSWORD
    ? {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    : null

const transporter = nodemailer.createTransport(
  {
    service: process.env.SMTP_SERVICE,
    ...(auth && { auth }),
    logger
  },
  { from: process.env.EMAIL_FROM }
)

transporter.verify()

module.exports = transporter
