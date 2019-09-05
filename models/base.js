const { Model, AjvValidator } = require('objection')
const tableName = require('objection-table-name')()
const { DbErrors } = require('objection-db-errors')
const authorize = require('objection-authorize')(require('../lib/acl'))
const visibility = require('objection-visibility').default
const hashId = require('objection-hashid')
const config = require('../config')

Model.knex(require('knex')(require('../knexfile')))

class BaseModel extends hashId(
  visibility(authorize(DbErrors(tableName(Model))))
) {
  static get modelPaths () {
    return [__dirname]
  }

  static get useLimitInFirst () {
    return true
  }

  static get defaultEagerAlgorithm () {
    return Model.JoinEagerAlgorithm
  }

  static get pageSize () {
    return 15
  }

  static get hashIdMinLength () {
    return 5
  }

  static createValidator () {
    this.jsonSchema = config.get(`schema:${this.name}`)
    this.relationMappings = config.get(`relations:${this.name}`)

    return new AjvValidator({
      // eslint-disable-next-line no-unused-vars
      onCreateAjv: ajv => {}, // need an empty function
      options: {
        // mutating inputs
        removeAdditional: true,
        useDefaults: true,
        coerceTypes: true
      }
    })
  }

  processInput () {}

  async $beforeInsert (queryContext) {
    await super.$beforeInsert(queryContext)
    await this.processInput(queryContext)
  }

  async $beforeUpdate (opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)
    await this.processInput(opt, queryContext)
  }

  static get QueryBuilder () {
    return class extends super.QueryBuilder {
      insert (body) {
        const q = super.insert(body).returning('*')

        return Array.isArray(body) ? q : q.first()
      }

      patch (body) {
        const q = super.patch(body).returning('*')

        return Array.isArray(body) ? q : q.first()
      }

      findById (id) {
        return super.findById(id).throwIfNotFound()
      }

      paginate (after, sortField = 'id', direction = 'desc') {
        return this.skipUndefined()
          .where(sortField, '<', after)
          .orderBy(sortField, direction)
          .limit(this.modelClass().pageSize)
      }
    }
  }
}

module.exports = BaseModel
