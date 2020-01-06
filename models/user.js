const BaseModel = require('./base')
const password = require('objection-password')()
const filterTempEmail = require('../services/filter-temp-email')
const normalize = require('normalize-email')
const mailer = require('../jobs/mailer')

class User extends password(BaseModel) {
  static get hidden() {
    return ['id', 'password']
  }

  processInput() {
    if (this.username) this.username = this.username.toLowerCase()
    if (this.email) {
      filterTempEmail(this.email)
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
    if (!template) throw new Error('required parameter: template')

    Object.assign(data, { template, to: this.email, user: this })
    const opts = { id: `${template}:${this.email}` }

    return mailer.add(data, opts)
  }
}

module.exports = User
