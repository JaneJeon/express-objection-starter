const BaseModel = require('./base')
const password = require('objection-password')()
const checkBlacklist = require('../lib/domain-checker')
const normalize = require('normalize-email')

class User extends password(BaseModel) {
  static get hidden() {
    return ['password']
  }

  static get reservedPostFields() {
    return ['role', 'verified']
  }

  static get relationMappings() {
    return {}
  }

  processInput() {
    if (this.email) {
      checkBlacklist(this.email)
      this.email = normalize(this.email)
    }
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)
    this.processInput()
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)
    this.processInput()
  }

  static get QueryBuilder() {
    return class extends super.QueryBuilder {
      findByUsername(username, user) {
        const loweredName = username.toLowerCase()
        if (user && user.username == loweredName) return user

        return this.findOne({ username: loweredName }).throwIfNotFound()
      }

      findByEmail(email) {
        return this.findOne({ email: normalize(email) }).throwIfNotFound()
      }
    }
  }

  getSession(id = '') {
    return `sess:${this.id}:${id}`
  }
}

module.exports = User
