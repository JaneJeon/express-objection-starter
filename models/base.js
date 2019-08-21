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
        if (!(req && resource)) return

        // prioritize the body that's passed in.
        // Additionally, since we constructed a new "req" object in authorize(),
        // messing with req's properties won't affect the "actual" request object
        if (body) req.body = body

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
      authorize(req, resource, skipFilter) {
        if (!req) throw new Error('authorization failed: no request specified')

        const user = req.user || { role: 'anonymous' }

        // in case of create, resource is necessarily empty, and we don't want
        // to assign it req.body since it will repeat indefinitely!!!
        resource = resource || this.context().instance || {}

        // limit the amount of context to body and user to hopefully reduce
        // the amount of shit that needs to be deep cloned. See #56
        this.mergeContext({ req: { user, body: req.body }, resource })

        const access = this.getAccess('read')

        // you generally don't want to skip filter
        if (!skipFilter)
          this.runAfter(result =>
            // if we're fetching multiple resources, the result will be an array.
            // While access.filter() accepts arrays, we need to invoke any $formatJson()
            // hooks by individually calling toJSON() on individual models since:
            // 1. arrays don't have toJSON() method,
            // 2. objection-visibility doesn't work without calling $formatJson()
            Array.isArray(result)
              ? result.map(model => access.filter(model.toJSON()))
              : // when doing DELETE operations, the result will be a number,
              // in which case access.filter balks so we just return that number instead.
              // Note that we're assuming if the result is an object, then it must be
              // an instance of Model, 'cause otherwise toJSON() won't be defined!!
              typeof result === 'object'
              ? access.filter(result.toJSON())
              : result
          )

        // check if you're even allowed to read
        return this.checkAccess(access)
      }

      insert(body) {
        const access = this.getAccess('create', body)

        // we have to check access first on "this" and THEN override insert()
        // on super, since checkAccess() isn't defined in super!
        this.checkAccess(access)

        // when authorize() isn't called, access will be empty
        if (access) body = access.filter(body)

        let q = super.insert(body).returning('*')
        if (!Array.isArray(body)) q = q.first()

        return q
      }

      patch(body) {
        const access = this.getAccess('update', body)
        this.checkAccess(access)
        if (access) body = access.filter(body)

        let q = super.patch(access.filter(body)).returning('*')
        if (!Array.isArray(body)) q = q.first()

        return q
      }

      delete() {
        const access = this.getAccess('delete')
        this.checkAccess(access)

        return super.delete()
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
