const { Model, AjvValidator } = require('objection')
const { DbErrors } = require('objection-db-errors')
const tableName = require('objection-table-name')()
const visibility = require('objection-visibility').default
const isEmpty = require('lodash/isEmpty')
const assert = require('http-assert')
const config = require('../config')

Model.knex(require('knex')(require('../knexfile')))

class BaseModel extends tableName(visibility(DbErrors(Model))) {
  static get jsonSchema() {
    return config.get(`schema:${this.name.toLowerCase()}`)
  }

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
    return new AjvValidator({
      onCreateAjv: ajv => {
        // modify the ajv instance
        require('ajv-keywords')(ajv, 'transform')
      },
      options: {
        // mutating inputs
        removeAdditional: true,
        useDefaults: true,
        coerceTypes: true
      }
    })
  }

  static get reservedPostFields() {
    return []
  }

  static get reservedPatchFields() {
    return []
  }

  // some fields shouldn't be manually set
  static filterPost(body) {
    assert(!isEmpty(body), 400)

    this.reservedPostFields.forEach(field =>
      assert(body[field] === undefined, 400)
    )
  }

  static filterPatch(body) {
    this.filterPost(body)

    this.reservedPatchFields.forEach(field =>
      assert(body[field] === undefined, 400)
    )
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
