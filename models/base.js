// istanbul ignore file
const { Model, AjvValidator } = require('objection')
const tableName = require('objection-table-name')()
const authorize = require('objection-authorize')(require('../policies'), 'casl')
const visibility = require('objection-visibility').default
const hashId = require('objection-hashid')
const config = require('../config')

const supportsReturning = ['pg', 'mssql'].includes(process.env.DATABASE_CLIENT)
Model.knex(require('knex')(require('../knexfile')))

class BaseModel extends hashId(visibility(authorize(tableName(Model)))) {
  static get modelPaths() {
    return [__dirname]
  }

  static get useLimitInFirst() {
    return true
  }

  static get pageSize() {
    return 15
  }

  static get hashIdMinLength() {
    return 5
  }

  static createValidator() {
    this.jsonSchema = config.get(`schema:${this.name}`)

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

  processInput() {}

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)
    await this.processInput(queryContext)
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)
    await this.processInput(opt, queryContext)
  }

  static get QueryBuilder() {
    return class extends super.QueryBuilder {
      insertAndFetch(body) {
        return supportsReturning
          ? Array.isArray(body)
            ? this.insert(body).returning('*')
            : this.insert(body)
                .returning('*')
                .first()
          : super.insertAndFetch(body)
      }

      patchAndFetchById(id, body) {
        return supportsReturning
          ? this.findById(id)
              .patch(body)
              .returning('*')
              .first()
          : super.patchAndFetchById(id, body)
      }

      patchAndFetch(body) {
        return supportsReturning
          ? Array.isArray(body)
            ? this.patch(body).returning('*')
            : this.patch(body)
                .returning('*')
                .first()
          : super.patchAndFetch(body)
      }

      findById(id) {
        return super.findById(id).throwIfNotFound()
      }

      findOne(obj) {
        return super.findOne(obj).throwIfNotFound()
      }

      paginate(after, sortField = 'id', direction = 'desc') {
        return this.skipUndefined()
          .where(sortField, '<', after)
          .orderBy(sortField, direction)
          .limit(this.modelClass().pageSize)
      }
    }
  }
}

module.exports = BaseModel
