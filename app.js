// istanbul ignore file
const config = require('./config')
require('./config/passport')
require('express-async-errors')

const passport = require('passport')
const express = require('express')
const app = express()
require('express-ws')(app)

if (config.get('proxy')) app.set('trust proxy', config.get('proxy'))

module.exports = app
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

/* -------------------- Asynchronous app init -------------------- */
const fs = require('fs')
const log = require('./lib/logger')

module.exports.initialize = async () => {
  const models = await fs.promises.readdir(`${__dirname}/models`)
  const inits = models
    .filter(
      file =>
        file.endsWith('.js') && file !== 'base.js' && file !== 'session.js'
    )
    .map(model => {
      const modelClass = require(`./models/${model}`)
      log.info(`Initializing model ${model}`)

      return modelClass.fetchTableMetadata()
    })

  await Promise.all(inits)
}
