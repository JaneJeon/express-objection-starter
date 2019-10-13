const { Router } = require('express')
const passport = require('passport')
const redis = require('../lib/redis')
const pick = require('lodash/pick')
const requireAuthN = require('../middlewares/require-authentication')
const parser = require('ua-parser-js')
const config = require('../config')

module.exports = Router()
  // TODO: short circuit 200 when logged in?
  .post('/login', passport.authenticate('local'), (req, res) => {
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = config.get('session:cookie:rememberMe')
    }

    const ua = parser(req.header('x-ucbrowser-ua') || req.header('user-agent'))

    req.session.ip = req.ip
    req.session.browser = ua.browser.name
    req.session.os = ua.os.name
    req.session.device = ua.device.type
    req.session.createdAt = new Date()

    res.status(201).send(req.user)
  })
  .delete('/logout', requireAuthN, (req, res, next) => {
    req.session.destroy(err => {
      if (err) req.log.error('Failed to destroy the session during logout', err)
      req.user = null
      res.sendStatus(204)
    })
  })
  .get('/sessions', requireAuthN, async (req, res) => {
    const sessPrefix = req.user.getSession()
    const sessPattern = req.user.getSession('*')
    const keys = new Set()

    // SCAN all sessions belonging to a user
    const scan = async cursor => {
      const result = await redis.scan(cursor, 'match', sessPattern)
      result[1].forEach(key => keys.add(key))
      if (result[0] !== 0) return scan(result[0])
    }
    await scan(0)

    const result = await redis.mget([...keys])
    const sessions = result
      .filter(x => x)
      .map(sess =>
        Object.assign(pick(sess, ['id', 'ip', 'useragent']), {
          self: sess.id === req.session.id,
          id: sess.id.substr(sessPrefix.length)
        })
      )

    res.send(sessions)
  })
  .delete('/sessions/:sessId', requireAuthN, async (req, res) => {
    await redis.del(req.user.getSession(req.params.sessId))

    res.sendStatus(204)
  })
