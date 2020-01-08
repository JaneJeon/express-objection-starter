const { tableName } = require('../models/user')

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments()
    table
      .text('username', 'mediumtext')
      .notNullable()
      .unique()
    table
      .text('email', 'mediumtext')
      .notNullable()
      .unique()
    table.text('password').notNullable()

    table.boolean('verified').notNullable()
    table.text('role').notNullable()

    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable(tableName)
