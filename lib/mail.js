/* eslint-disable no-undef */
const nodemailer = require('nodemailer')
const config = require('../config')

const transport = nodemailer.createTransport(
  config.get('mail:smtp'),
  config.get('mail:defaults')
)

// a custom plugin based on nodemailer-express-handlebars,
// that can handle compiling both text and subject instead of just the HTML.
// May or may not contain traces of black magic.

Handlebars = require('handlebars/runtime') // the precompiler ONLY works with globals
require('../views/emails') // load in the (global) precompiled email templates

transport.use('compile', (mail, done) => {
  const { template } = mail.data
  if (!template) return done()

  mail.data.subject = Handlebars.templates[`${template}/subject`](mail.data)
  mail.data.text = Handlebars.templates[`${template}/text`](mail.data)
  mail.data.html = Handlebars.templates[`${template}/html`](mail.data)

  done()
})

// ignore the mail server not being there for migrations and dev/test modes
if (config.get('node:env') === 'production') transport.verify()

module.exports = transport
