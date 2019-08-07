const { Router } = require('express')
const User = require('../models/user')

module.exports = Router()
  .param('username', async (req, res, next, username) => {
    req.requestedUser = await User.query().findByUsername(username, req.user)
    next()
  })
  .get('/', (req, res) => res.sendStatus(200))
  .use('/', require('./sessions'))
  .use('/users', require('./users'))
