const { Router } = require('express')
const User = require('../models/user')
const requireAuthN = require('../middlewares/require-authentication')
const config = require('../config')

const FRONTEND_URL = config.get('frontend:url')
const JWT_SECRET = config.get('jwt:secret')
const jwt = require('jsonwebtoken')

module.exports = Router()
  .get('/user', requireAuthN, (req, res) => {
    res.send(req.user)
  })
  .post('/users', async (req, res) => {
    const user = await User.query()
      .authorize(req.user, null, {
        unauthorizedErrorCode: 405,
        userFromResult: true
      })
      .insertAndFetch(req.body)

    req.login(user, async err => {
      if (err) throw err
      res.status(201).send(req.user)

      // the row is already added, so we don't want to fail the request if this fails
      const subject = 'verify-email'

      const token = jwt.sign({}, JWT_SECRET, {
        subject,
        audience: req.user.hashId,
        expiresIn: '1d'
      })
      const data = { link: `${FRONTEND_URL}/user/verify/${token}` }
      await req.user.sendMail(subject, data)
    })
  })
  .post('/user/verify', requireAuthN, async (req, res) => {
    const subject = 'verify-email'

    const token = jwt.sign({}, JWT_SECRET, {
      subject,
      audience: req.user.hashId,
      expiresIn: '1d'
    })
    const data = { link: `${FRONTEND_URL}/user/verify/${token}` }
    await req.user.sendMail(subject, data)

    res.end()
  })
  .patch('/user/verify/:token', async (req, res) => {
    const subject = 'verify-email'

    const { aud } = jwt.verify(req.params.token, JWT_SECRET, { subject })
    const user = await User.query()
      .findByHashId(aud)
      .patchAndFetch({ verified: true })

    // automatically log in user since we know they own the account
    req.login(user, async err => {
      // istanbul ignore next
      if (err) throw err
      res.send(req.user)
    })
  })
  .post('/user/forgot/:email', async (req, res) => {
    const subject = 'password-reset'

    const user = await User.query().findByEmail(req.params.email)
    const token = jwt.sign({}, JWT_SECRET, {
      subject,
      audience: user.hashId,
      expiresIn: '1d'
    })
    const data = { link: `${FRONTEND_URL}/user/reset/${token}` }
    await user.sendMail(subject, data)

    res.end()
  })
  .patch('/user/reset/:token', async (req, res) => {
    const subject = 'password-reset'

    const { aud } = jwt.verify(req.params, JWT_SECRET, { subject })
    const user = await User.query()
      .findByHashId(aud)
      .patchAndFetch({ verified: true })

    // automatically log in user since we know they own the account
    req.login(user, async err => {
      // istanbul ignore next
      if (err) throw err
      res.send(req.user)
    })
  })
  .delete('/user', requireAuthN, async (req, res) => {
    await req.user
      .$query()
      .authorize(req.user, null, { unauthorizedErrorCode: 400 })
      .delete(req.body)

    res.sendStatus(204)
  })
  .get('/users/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    const user = await User.query()
      .authorize(req.user)
      .findByUsername(username)

    res.send(user)
  })
  .patch('/users/:username', async (req, res) => {
    const username = req.params.username.toLowerCase()
    let user = await User.query().findByUsername(username)
    user = await user
      .$query()
      .authorize(req.user)
      .patchAndFetch(req.body)

    res.send(user)
  })
