const { Router } = require('express')
const User = require('../models/user')

module.exports = Router()
  .get('/users/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    const user = await User.query()
      .authorize(req.user, { username }) // only need to check username
      .findByUsername(username)

    res.send(user)
  })
  .patch('/users/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    let user = await User.query().findByUsername(username)
    user = await user
      .$query()
      .authorize(req.user)
      .patch(req.body)

    res.send(user)
  })
