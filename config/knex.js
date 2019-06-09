require("./env")

const { types } = require("pg")
const dayjs = require("dayjs")
types.setTypeParser(20, parseInt) // cast SELECT COUNT(*) to integer
types.setTypeParser(1082, obj => dayjs(obj).format("YYYY-MM-DD"))

const { knexSnakeCaseMappers } = require("objection")
const path = require("path")

module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  debug: (process.env.DEBUG || "").includes("knex"),
  migrations: { directory: path.join(__dirname, "..", "migrations") },
  seeds: { directory: path.join(__dirname, "..", "seeds") },
  pool: {
    afterCreate: (conn, done) => {
      conn.query('SET timezone="UTC"', err => done(err, conn))
    }
  },
  ...knexSnakeCaseMappers()
}
