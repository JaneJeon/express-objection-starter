const { Router } = require('express')
const User = require('../models/user')
const requireAuthN = require('../middlewares/require-authentication')
const token = require('../lib/token')
const config = require('../config')

module.exports = Router()
  .post('/account', async (req, res) => {
    const user = await User.query()
      .authorize(req.user, null, {
        unauthorizedErrorCode: 405,
        userFromResult: true
      })
      .insert(req.body)

    req.login(user, async err => {
      if (err) throw err
      res.status(201).send(req.user)

      // the row is already added, so we don't want to fail the request if this fails
      const userToken = await token.generate('verify-email', req.user.id)
      const data = { link: `${config.get('frontend:url')}/${userToken}` }
      await req.user.sendMail('verify-email', data)
    })
  })
  .post('/account/verify', requireAuthN, async (req, res) => {
    const userToken = await token.generate('verify-email', req.user.id)
    const data = { link: `${config.get('frontend:url')}/${userToken}` }
    await req.user.sendMail('verify-email', data, true)

    res.end()
  })
  .patch('/account/verify/:token', async (req, res) => {
    const id = await token.consume('verify-email', req.params.token)
    const user = await User.query()
      .findById(id)
      .patch({ verified: true })

    // automatically log in user since we know they own the account
    req.login(user, async err => {
      if (err) throw err
      res.send(req.user)
    })
  })
  .post('/account/forgot/:email', async (req, res) => {
    const user = await User.query().findByEmail(req.params.email)
    const userToken = await token.generate('password-reset', user.id)
    const data = { link: `${config.get('frontend:url')}/${userToken}` }
    await user.sendMail('password-reset', data, true)

    res.end()
  })
  .patch('/account/reset/:token', async (req, res) => {
    const id = await token.consume('verify-email', req.params.token)
    const user = await User.query()
      .findById(id)
      .patch({ password: req.body.password })

    // automatically log in user since we know they own the account
    req.login(user, async err => {
      if (err) throw err
      res.send(req.user)
    })
  })
  .delete('/account', requireAuthN, async (req, res) => {
    await req.user
      .$query()
      .authorize(req.user, null, { unauthorizedErrorCode: 400 })
      .delete()

    res.sendStatus(204)
  })
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
