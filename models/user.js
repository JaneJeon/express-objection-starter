const BaseModel = require("./base")
const { default: visibility } = require("objection-visibility")
const password = require("objection-password")()
const normalize = require("normalize-email")

class User extends password(visibility(BaseModel)) {
  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        username: {
          type: "string",
          transform: ["trim", "toLowerCase"],
          minLength: +process.env.MIN_USERNAME_LENGTH,
          maxLength: +process.env.MAX_USERNAME_LENGTH,
          pattern: "^\\w+$"
        },
        email: { type: "string", format: "email" },
        password: {
          type: "string",
          minLength: +process.env.MIN_PASSWORD_LENGTH,
          maxLength: +process.env.MAX_PASSWORD_LENGTH
        },
        verified: { type: "boolean", default: false },
        role: {
          type: "string",
          enum: ["user", "admin", "superuser"],
          default: "user"
        }
      },
      required: ["username", "email", "password"],
      additionalProperties: false
    }
  }

  static get hidden() {
    return ["password"]
  }

  static get reservedPostFields() {
    return ["role", "verified"]
  }

  static get relationMappings() {
    return {}
  }

  get isAdmin() {
    return this.role == "admin" || this.role == "superuser"
  }

  processInput() {
    if (this.email) this.email = normalize(this.email)
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
      findByUsername(username) {
        return this.findOne({
          username: username.toLowerCase()
        }).throwIfNotFound()
      }

      findByEmail(email) {
        return this.findOne({ email: normalize(email) }).throwIfNotFound()
      }
    }
  }
}

module.exports = User
