const nconf = require('nconf')

nconf
  .argv({ parseValues: true })
  .env({ parseValues: true, lowerCase: true, separator: '_' })

if (nconf.get('node:env')) nconf.file(`./config.${nconf.get('node:env')}.json`)

module.exports = nconf.defaults(require('./config.default'))
