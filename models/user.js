/* eslint-disable no-unused-vars */
const BaseModel = require('./base')
const password = require('objection-password')()
const checkBlacklist = require('../lib/domain-checker')
const normalize = require('normalize-email')
const Mailer = require('../jobs/mailer')
const redis = require('../lib/redis')

class User extends password(BaseModel) {
  static get hidden() {
    return ['id', 'password']
  }

  processInput() {
    if (this.username) this.username = this.username.toLowerCase()
    if (this.email) {
      checkBlacklist(this.email)
      this.email = normalize(this.email)
    }
  }

  static get QueryBuilder() {
    return class extends super.QueryBuilder {
      findByUsername(username) {
        return this.findOne({ username }).throwIfNotFound()
      }

      findByEmail(email) {
        return this.findOne({ email: normalize(email) }).throwIfNotFound()
      }
    }
  }

  getSession(id = '') {
    return `sess:${this.id}:${id}`
  }

  // data: https://nodemailer.com/message/
  async sendMail(template, data = {}) {
    return Mailer.add(
      Object.assign(data, { template, to: this.email, user: this })
    )
  }

  async generateToken(namespace, expires) {
    //
  }
}

module.exports = User
