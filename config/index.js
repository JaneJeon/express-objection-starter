const path = require('path')
const nconf = require('nconf')

nconf
  .argv({ parseValues: true })
  .env({ parseValues: true, lowerCase: true, separator: '_' })
  .add('schema', { type: 'literal', store: { schema: require('./schema') } })
  .add('relations', {
    type: 'literal',
    store: { relations: require('./relations') }
  })
  .file(
    'envs',
    path.resolve(__dirname, 'environments', `${nconf.get('node:env')}.json`)
  )
  .file('default', path.resolve(__dirname, 'environments', 'default.json'))

module.exports = nconf
