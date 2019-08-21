const { Router } = require('express')
const User = require('../models/user')

module.exports = Router()
  .get('/users/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    const user = await User.query()
      .authorize(req, { username }) // only need to check username
      .findByUsername(username)

    res.send(user)
  })
  .post('/users', async (req, res) => {
    const user = await User.query()
      // we need the id field to serialize req.user (as defined in config/passport.js)
      // since username can change while id is immutable
      .authorize(req, null, true)
      .insert(req.body)

    req.login(user, err => {
      if (err) throw err
      res.status(201).send(req.user)
    })
  })
  .patch('/users/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    let user = await User.query().findByUsername(username)
    user = await user
      .$query()
      .authorize(req)
      .patch(req.body)

    res.send(user)
  })
  .delete('/account', async (req, res) => {
    const user = req.user || {}
    await User.query()
      .authorize(req, { username: user.username })
      .deleteById(user.id)

    res.sendStatus(204)
  })
