const config = require('./config')

if (config.get('database:client') == 'pg') {
  const { types } = require('pg')
  const dayjs = require('dayjs')
  types.setTypeParser(20, parseInt) // cast SELECT COUNT(*) to integer
  // to get around jsonschema validation quirks regarding date objects vs. strings
  types.setTypeParser(1082, obj => dayjs(obj).format('YYYY-MM-DD'))
}

const { knexSnakeCaseMappers } = require('objection')
const log = require('./lib/logger')

module.exports = Object.assign(config.get('database'), {
  ...knexSnakeCaseMappers(),
  log: {
    warn: log.warn,
    deprecate: log.warn,
    error: log.error,
    debug: log.debug
  }
})
