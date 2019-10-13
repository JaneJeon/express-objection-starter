// istanbul ignore file
const config = require('./config')
require('./config/passport')
require('express-async-errors')
const log = require('./lib/logger')

const passport = require('passport')
const express = require('express')
const app = express()
require('express-ws')(app)

if (config.get('proxy')) app.set('trust proxy', config.get('proxy'))

app
  .use(require('./middlewares/access-logger'))
  .use(require('express-request-id')())
  .use(require('./middlewares/express-logger'))
  .use(require('helmet')())
  .use(require('cors')({ origin: true }))
  .use(require('./middlewares/session'))
  .use(require('./middlewares/ratelimiter'))
  .use(express.json())
  .use(require('express-query-boolean')())
  .use(passport.initialize())
  .use(passport.session())
  .use(require('./routes'))
  // eslint-disable-next-line no-unused-vars
  .use((req, res) => res.sendStatus(404))
  .use(require('./middlewares/error-handler'))

// jest runs multiple instances of the server, so it results in port conflict
if (config.get('node:env') !== 'test')
  require('./lib/acl')
    .initialize()
    .then(() => {
      const server = app.listen(config.get('port'), function(err) {
        if (err) {
          log.error(err)
          process.exit(1)
        } else log.info(`Server listening on port ${this.address().port}`)
      })

      server.setTimeout(config.get('timeout'))

      process
        .on('SIGINT', () => server.close())
        .on('SIGTERM', () => server.close())
    })

module.exports = app
