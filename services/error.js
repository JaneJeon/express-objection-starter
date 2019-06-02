const debug = require("./debug")("error")

module.exports = (err, req, res, next) => {
  debug("req.user: %o", req.user)
  debug("req.body: %o", req.body)

  console.error(err)

  if (res.headersSent) return

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
}
