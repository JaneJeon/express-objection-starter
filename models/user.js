const BaseModel = require('./base')
const password = require('objection-password')()
const assert = require('http-assert')
const mailchecker = require('mailchecker')
const normalize = require('normalize-email')

class User extends password(BaseModel) {
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          transform: ['trim', 'toLowerCase'],
          minLength: 4,
          maxLength: 15,
          pattern: '^\\w+$'
        },
        email: { type: 'string' },
        password: {
          type: 'string',
          minLength: 8,
          maxLength: 60
        },
        verified: { type: 'boolean', default: false },
        role: {
          type: 'string',
          enum: ['user', 'admin', 'superuser'],
          default: 'user'
        }
      },
      required: ['username', 'email', 'password'],
      additionalProperties: false
    }
  }

  static get hidden() {
    return ['password']
  }

  static get reservedPostFields() {
    return ['role', 'verified']
  }

  static get relationMappings() {
    return {}
  }

  get isAdmin() {
    return this.role == 'admin' || this.role == 'superuser'
  }

  processInput() {
    if (this.email) {
      assert(mailchecker.isValid(this.email), 400, 'email is invalid')
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
