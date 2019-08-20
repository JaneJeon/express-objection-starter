const { Router } = require('express')
const User = require('../models/user')

module.exports = Router()
  .get('/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    const user = await User.query()
      .authorize(req.user, { username })
      .findByUsername(username)

    res.send(user)
  })
  .post('/', async (req, res) => {
    const user = await User.query()
      .authorize(req.user, undefined, 'create')
      .insert(req.body)

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
      .authorize(req.user, user, 'update')
      .patch(req.body)

    res.send(user)
  })
  .delete('/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    const user = await User.query().findByUsername(username)
    await user
      .$query()
      .authorize(req.user, user, 'delete')
      .delete()

    res.sendStatus(204)
  })
