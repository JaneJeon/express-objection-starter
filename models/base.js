const { Model, AjvValidator } = require('objection')
const { DbErrors } = require('objection-db-errors')
const tableName = require('objection-table-name')()
const visibility = require('objection-visibility').default
const config = require('../config')

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
    this.hidden = config.get(`visibility:${name}:hidden`)
    this.visible = config.get(`visibility:${name}:visible`)

    return new AjvValidator({
      options: {
        // mutating inputs
        removeAdditional: true,
        useDefaults: true,
        coerceTypes: true
      }
    })
  }

  static get pageSize() {
    return 15
  }

  static get QueryBuilder() {
    return class extends Model.QueryBuilder {
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
