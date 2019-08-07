const path = require('path')
const nconf = require('nconf')
nconf.formats.yaml = require('nconf-yaml')

nconf
  .argv({ parseValues: true })
  .env({ parseValues: true, lowerCase: true, separator: '_' })

if (process.env.NODE_ENV)
  nconf.file({
    file: path.resolve(
      __dirname,
      'environments',
      `${process.env.NODE_ENV}.yml`
    ),
    format: nconf.formats.yaml
  })

nconf.file({
  file: path.resolve(__dirname, 'environments', 'default.yml'),
  format: nconf.formats.yaml
})

module.exports = nconf
