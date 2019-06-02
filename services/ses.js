const SES = require("aws-sdk/clients/ses")

module.exports = new SES(require("./aws"))
