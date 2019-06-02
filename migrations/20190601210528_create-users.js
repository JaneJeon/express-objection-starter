const tableName = "users"

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.text("username").primary()
    table
      .text("email")
      .notNullable()
      .unique()
    table.text("password").notNullable()

    table.boolean("verified").notNullable()
    table.text("avatar").notNullable()
    table.text("role").notNullable()

    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable(tableName)
