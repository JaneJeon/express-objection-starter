const nodemailer = require("nodemailer")
const SES = require("aws-sdk/clients/ses")
const logger = require("./logger")

module.exports = nodemailer.createTransport(
  { SES: new SES(), logger },
  { from: process.env.EMAIL_ADDRESS }
)
