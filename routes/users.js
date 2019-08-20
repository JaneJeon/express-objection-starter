const { Router } = require('express')
const User = require('../models/user')

module.exports = Router()
  .get('/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    const user = await User.query()
      .findByUsername(username)
      .authorize(req.user, { username }) // only need to check username

    res.send(user)
  })
  .post('/', async (req, res) => {
    const user = await User.query()
      .insert(req.body)
      .authorize(req.user)

    req.login(user, err => {
      if (err) throw err
      res.status(201).send(req.user)
    })
  })
  .patch('/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    let user = await User.query().findByUsername(username)
    user = await user
      .$query()
      .patch(req.body)
      .authorize(req.user, user)

    res.send(user)
  })
  .delete('/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    await User.query()
      .delete()
      .authorize(req.user, { username }) // only need to check username

    res.sendStatus(204)
  })
