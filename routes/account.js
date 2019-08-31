const { Router } = require('express')
const requireAuthN = require('../middlewares/require-authentication')
const User = require('../models/user')
const Mailer = require('../jobs/mailer')

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
      // TODO: link
      await req.user.sendMail('verify-email', {})
    })
  })
  .post('/account/verify', requireAuthN, async (req, res) => {
    await Mailer.runOrCreate()

    res.end()
  })
  .patch('/account/verify/:token', requireAuthN, async (req, res) => {
    //
  })
  .post('/account/reset', requireAuthN, async (req, res) => {
    await req.user.sendMail('verify-email', {})

    res.end()
  })
  .patch('/account/reset/:token', requireAuthN, async (req, res) => {
    //
  })
  .delete('/account', requireAuthN, async (req, res) => {
    await User.query()
      .authorize(req, req.user)
      .deleteById(req.user.id)

    res.sendStatus(204)
  })
