const path = require('path')
const nconf = require('nconf')

nconf
  .argv({ parseValues: true })
  .env({ parseValues: true, lowerCase: true, separator: '_' })
  .file('schema', path.resolve(__dirname, 'schema.json'))
  .file('relations', path.resolve(__dirname, 'relations.json'))
  .add('acl', { type: 'literal', store: { acl: require('./acl') } })
  .file(
    'envs',
    path.resolve(__dirname, 'environments', `${nconf.get('node:env')}.json`)
  )
  .file('default', path.resolve(__dirname, 'environments', 'default.json'))

module.exports = nconf
