const BaseModel = require('./base')
const password = require('objection-password')()
const checkBlacklist = require('../lib/domain-checker')
const normalize = require('normalize-email')
const mail = require('../lib/mail')

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

  async sendMail(template, data) {
    return mail.sendMail({
      to: this.email
    })
  }
}

module.exports = User
