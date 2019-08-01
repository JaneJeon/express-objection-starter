// we only need to load environment when we use knex cli,
// which means NODE_ENV isn't loaded by nodemon, jest, or pm2
const cliMode = !process.env.NODE_ENV
if (cliMode) require("dotenv-defaults").config()

const client = process.env.DATABASE_CLIENT

if (client == "pg") {
  const { types } = require("pg")
  const dayjs = require("dayjs")
  types.setTypeParser(20, parseInt) // cast SELECT COUNT(*) to integer
  // to get around jsonschema validation quirks regarding date objects vs. strings
  types.setTypeParser(1082, obj => dayjs(obj).format("YYYY-MM-DD"))
}

const { knexSnakeCaseMappers } = require("objection")
const log = require("./services/logger")

module.exports = {
  client,
  connection: process.env.DATABASE_URL,
  ...knexSnakeCaseMappers(),
  debug: cliMode,
  log: {
    warn: log.warn,
    deprecate: log.warn,
    error: log.error,
    debug: log.debug
  }
}
