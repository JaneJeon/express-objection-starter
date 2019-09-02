const { Router } = require('express')

module.exports = Router()
  .get('/', (req, res) => res.sendStatus(200))
  .use(require('./sessions'))
  .use(require('./users'))
  .use(require('./account'))
