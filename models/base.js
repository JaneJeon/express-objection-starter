const { Model, AjvValidator } = require('objection')
const tableName = require('objection-table-name')()
const { DbErrors } = require('objection-db-errors')
const visibility = require('objection-visibility').default
const config = require('../config')
const acl = require('../lib/acl')
const assert = require('http-assert')

Model.knex(require('knex')(require('../knexfile')))

class BaseModel extends visibility(DbErrors(tableName(Model))) {
  static get modelPaths() {
    return [__dirname]
  }

  static get useLimitInFirst() {
    return true
  }

  static get defaultEagerAlgorithm() {
    return Model.JoinEagerAlgorithm
  }

  static createValidator() {
    const name = this.name.toLowerCase()
    this.jsonSchema = config.get(`schema:${name}`)
    this.relationMappings = config.get(`relations:${name}`)

    return new AjvValidator({
      options: {
        // mutating inputs
        removeAdditional: true,
        useDefaults: true,
        coerceTypes: true
      }
    })
  }

  processInput() {}

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)
    await this.processInput(queryContext)
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)
    await this.processInput(opt, queryContext)
  }

  static get pageSize() {
    return 15
  }

  static get QueryBuilder() {
    return class extends Model.QueryBuilder {
      check(user = { role: 'anonymous' }, method = 'read', resource = {}) {
        const access = acl
          .can(user.role)
          .execute(method)
          .with(Object.assign(resource, { requester: user }))
          .on(this.modelClass().name)

        assert(access.granted, 403)

        return this.runAfter(result => access.filter(result))
      }

      findById(id) {
        return super.findById(id).throwIfNotFound()
      }

      paginate(after, sortField = 'id') {
        return this.skipUndefined()
          .where(sortField, '<', after)
          .orderBy(sortField, 'desc')
          .limit(this.modelClass().pageSize)
      }

      insert(obj) {
        let q = super.insert(obj).returning('*')
        if (!Array.isArray(obj)) q = q.first()

        return q
      }

      patch(obj) {
        return super.patch(obj).returning('*')
      }
    }
  }
}

module.exports = BaseModel
