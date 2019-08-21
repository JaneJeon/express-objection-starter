// this is only here because sessions aren't based on Objection models.
// do NOT use this anywhere outside the session routes - use acl instead!
const assert = require('http-assert')

module.exports = (req, res, next) => next(assert(req.user, 401))
