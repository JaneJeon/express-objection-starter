const assert = require("http-assert")

exports.ensureIsSignedIn = (req, res, next) => next(assert(req.user, 401))

exports.ensureIsAdminOrSelf = (req, res, next) =>
  next(assert(req.user.username == req.params.userId || req.user.isAdmin, 403))
