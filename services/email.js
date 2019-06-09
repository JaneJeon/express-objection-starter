const nodemailer = require("nodemailer")
const SES = require("aws-sdk/clients/ses")

module.exports = nodemailer.createTransport({
  SES: new SES(require("../config/aws"))
})
