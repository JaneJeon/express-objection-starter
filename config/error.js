const { ValidationError, NotFoundError } = require("objection")
const {
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError
} = require("objection-db-errors")

module.exports = (err, req, res, next) => {
  req.log.debug("req.user: %o, req.body: %o", req.user, req.body)

  if (res.headersSent) {
    log.error(err)
    return
  }

  if (err instanceof ValidationError || err instanceof DataError) {
    err.statusCode = 400
  } else if (err instanceof NotNullViolationError) {
    err.statusCode = 400
    err.data = {
      column: err.column,
      table: err.table
    }
  } else if (err instanceof CheckViolationError) {
    err.statusCode = 400
    err.data = {
      table: err.table,
      constraint: err.constraint
    }
  } else if (err instanceof NotFoundError) {
    err.statusCode = 404
  } else if (err instanceof UniqueViolationError) {
    err.statusCode = 409
    err.data = {
      columns: err.columns,
      table: err.table,
      constraint: err.constraint
    }
  } else if (err instanceof ForeignKeyViolationError) {
    err.statusCode = 409
    err.data = {
      table: err.table,
      constraint: err.constraint
    }
  } else if (err instanceof DBError) {
    err.statusCode = 500
    err.name = "UnknownDatabaseError"
  } else if (err.type && err.type.startsWith("Stripe")) {
    // https://github.com/stripe/stripe-node/blob/master/lib/Error.js#L30
    this.name = this.type
    this.data = this.detail
  } else if (!err.statusCode) {
    err.statusCode = 500
    err.name = "UnknownError"
  }

  if (err.statusCode == 500 || process.env.NODE_ENV == "development")
    req.log.error(err)

  res.status(err.statusCode).send({
    message: err.message,
    name: err.name,
    data: err.data || {}
  })
}
