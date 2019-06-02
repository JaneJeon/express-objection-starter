const { Model } = require("objection")
const { DbErrors } = require("objection-db-errors")
const memoize = require("lodash/memoize")
const { plural } = require("pluralize")
const camelCase = require("lodash/camelCase")
const pluralCamelCaseMapper = memoize(str => plural(camelCase(str)))
const isEmpty = require("lodash/isEmpty")
const assert = require("http-assert")

Model.knex(require("knex")(require("../services/knex")))

class BaseModel extends DbErrors(Model) {
  static get tableName() {
    return pluralCamelCaseMapper(this.name)
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
      paginate(after, sortField = "id") {
        return this.skipUndefined()
          .where(sortField, "<", after)
          .orderBy(sortField, "desc")
          .limit(this.modelClass().pageSize)
      }

      insert(obj) {
        let q = super.insert(obj).returning("*")
        if (!Array.isArray(obj)) q = q.first()

        return q
      }

      patch(obj) {
        return super.patch(obj).returning("*")
      }
    }
  }
}

module.exports = BaseModel
