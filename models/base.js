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
    // yes, I'm using this as a static one-time hook
    const name = this.name.toLowerCase()
    this.jsonSchema = config.get(`schema:${name}`)
    this.relationMappings = config.get(`relations:${name}`)

    return new AjvValidator({
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

  static get pageSize() {
    return 15
  }

  // inject instance context
  $query(trx) {
    return super.$query(trx).mergeContext({ instance: this })
  }

  $relatedQuery(relation, trx) {
    return super.$relatedQuery(relation, trx).mergeContext({ instance: this })
  }

  // I'm in awe and in disgust at the same time
  static get QueryBuilder() {
    return class extends Model.QueryBuilder {
      // wrappers around acl, querybuilder, and model
      getAccess(action, body) {
        const { req, resource } = this.context()
        req.body = body || req.body // prioritize fn input
        if (!(req && resource)) return

        return acl
          .can(req.user.role)
          .execute(action)
          .with(Object.assign(resource, { req }))
          .on(this.modelClass().name)
      }

      checkAccess(access) {
        const req = this.context().req
        if (access)
          assert(access.granted, req.user.role == 'anonymous' ? 401 : 403)

        return this
      }

      // a magic method that schedules the actual authorization logic to be called
      // later down the line when the "action method" (insert/patch/delete) is called
      authorize(req, resource) {
        if (!req) throw new Error('authorization failed: no request specified')

        req.user = req.user || { role: 'anonymous' }
        resource = resource || this.context().instance || req.body

        if (!resource)
          throw new Error('authorization failed: no resource specified')

        this.mergeContext({ req, resource })

        const access = this.getAccess('read')

        // check if you're even allowed to read, then filter result later
        return this.checkAccess(access).runAfter(result =>
          result.map(model => access.filter(model.toJSON()))
        )
      }

      insert(body) {
        const access = this.getAccess('insert', body)

        let q = super
          .checkAccess(access)
          .insert(access.filter(body))
          .returning('*')
        if (!Array.isArray(body)) q = q.first()

        return q
      }

      patch(body) {
        const access = this.getAccess('update', body)

        let q = super
          .checkAccess(access)
          .patch(access.filter(body))
          .returning('*')
        if (!Array.isArray(body)) q = q.first()

        return q
      }

      delete() {
        const access = this.getAccess('delete')

        return super.checkAccess(access).delete()
      }

      findById(id) {
        return super.findById(id).throwIfNotFound()
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
