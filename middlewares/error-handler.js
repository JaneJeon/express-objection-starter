const { ValidationError, NotFoundError } = require('objection')
const { DBError } = require('objection-db-errors')

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    req.log.error({ req, err, res }, 'an error occurred after request was sent')
    return
  }

  if (!err.statusCode) {
    if (err instanceof ValidationError) err.statusCode = 400
    else if (err instanceof NotFoundError) err.statusCode = 404
    else if (err instanceof DBError)
      err.statusCode = (() => {
        switch (err.name) {
          case 'NotNullViolationError':
          case 'CheckViolationError':
          case 'DataError':
          case 'ConstraintViolationError':
            return 400
          case 'UniqueViolationError':
          case 'ForeignKeyViolationError':
            return 409
          default:
            return 500
        }
      })()
    else err.statusCode = 500
  }

  res.status(err.statusCode).send({
    message: err.message,
    name: err.name
  })

  const level = err.statusCode >= 500 ? 'error' : 'warn'
  req.log[level]({ req, err, res }, 'Request failed')
}
