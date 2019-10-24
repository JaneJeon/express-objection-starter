const path = require('path')
const nconf = require('nconf')

nconf
  .argv({ parseValues: true })
  .env({ parseValues: true, lowerCase: true, separator: '_' })
  .add('schema', { type: 'literal', store: { schema: require('./schema') } })
  .file(
    'envs',
    path.resolve(__dirname, 'environments', `${process.env.NODE_ENV}.json`)
  )
  .file('default', path.resolve(__dirname, 'environments', 'default.json'))

// mappings
if (process.env.DATABASE_URL) {
  // istanbul ignore next
  nconf.set('knex:connection', process.env.DATABASE_URL)
}
// TODO: bonsai_url

module.exports = nconf
