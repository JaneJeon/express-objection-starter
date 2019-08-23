// usually, you want to use ACL instead of checking req.user
const assert = require('http-assert')

module.exports = (req, res, next) => next(assert(req.user, 401))
