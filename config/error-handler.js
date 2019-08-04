const { ValidationError, NotFoundError } = require("objection")
const { DBError } = require("objection-db-errors")

module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    if (err instanceof ValidationError) err.statusCode = 400
    else if (err instanceof NotFoundError) err.statusCode = 404
    else if (err instanceof DBError)
      err.statusCode = (() => {
        switch (err.name) {
          case ("NotNullViolationError",
          "CheckViolationError",
          "DataError",
          "ConstraintViolationError"):
            return 400
          case ("UniqueViolationError", "ForeignKeyViolationError"):
            return 409
          default:
            return 500
        }
      })()
  }

  res.status(err.statusCode).send({
    message: err.message,
    name: err.name
  })
}
