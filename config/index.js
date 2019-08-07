const nconf = require('nconf')
nconf.formats.yaml = require('nconf-yaml')

nconf
  .argv({ parseValues: true })
  .env({ parseValues: true, lowerCase: true, separator: '_' })

if (nconf.get('node:env'))
  nconf.file({
    file: `./environments/${nconf.get('node:env')}.yml`,
    format: nconf.formats.yaml
  })

module.exports = nconf.file({
  file: './environments/default.yml',
  format: nconf.formats.yaml
})
