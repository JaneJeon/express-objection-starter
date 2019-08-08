const path = require('path')
const nconf = require('nconf')

nconf
  .argv({ parseValues: true })
  .env({ parseValues: true, lowerCase: true, separator: '_' })
  .file('schema', path.resolve(__dirname, 'schema.json'))
  .file('acl', path.resolve(__dirname, 'acl.json'))
  .file(
    'envs',
    path.resolve(__dirname, 'environments', `${nconf.get('node:env')}.json`)
  )
  .file('default', path.resolve(__dirname, 'environments', 'default.json'))

module.exports = nconf
