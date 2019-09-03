// eslint-disable-next-line no-unused-vars
const config = require('../config')
const middlewares = []

// TODO: conditions
middlewares.push(require('express-sslify').HTTPS())
middlewares.push(require('helmet')())
middlewares.push(require('cors')())
middlewares.push(require('compression')())
middlewares.push(require('express-request-id')())
middlewares.push(require('./request-logger'))
middlewares.push(require('morgan')())
middlewares.push(require('./session'))
middlewares.push(require('./ratelimiter'))

module.exports = middlewares
