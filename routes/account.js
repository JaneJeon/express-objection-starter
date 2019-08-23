const { Router } = require('express')
const requireAuthN = require('../middlewares/require-authentication')
const User = require('../models/user')
const VerifyEmailJob = require('../jobs/verify-email')
const PasswordResetJob = require('../jobs/password-reset')

module.exports = Router()
  .get('/account', requireAuthN, (req, res) =>
    res.redirect(`/users/${req.user.username}`)
  )
  .post('/account', async (req, res) => {
    const user = await User.query()
      // we need the id field to serialize req.user (see config/passport.js)
      // since username can change while id is immutable
      .authorize(req, null, true)
      .insert(req.body)

    req.login(user, async err => {
      if (err) throw err
      res.status(201).send(req.user)

      // the row is already added, so we don't want to fail the request if this fails
      await VerifyEmailJob.add({ email: req.user.email })
    })
  })
  .post('/account/verify', requireAuthN, async (req, res) => {
    await VerifyEmailJob.add({ email: req.user.email })

    res.end()
  })
  .post('/account/verify/:token', requireAuthN, async (req, res) => {
    //
  })
  .post('/account/reset', requireAuthN, async (req, res) => {
    await PasswordResetJob.add({ email: req.user.email })

    res.end()
  })
  .post('/account/reset/:token', requireAuthN, async (req, res) => {
    //
  })
  .delete('/account', requireAuthN, async (req, res) => {
    await User.query()
      .authorize(req, req.user)
      .deleteById(req.user.id)

    res.sendStatus(204)
  })
