const nconf = require('nconf')

nconf
  .argv({ parseValues: true })
  .env({ parseValues: true, lowerCase: true, separator: '_' })

if (nconf.get('node:env'))
  nconf.file(`./environments/${nconf.get('node:env')}.json`)

module.exports = nconf.defaults(require('./environments/default'))
