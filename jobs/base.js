const queue = require('../lib/queue')
const logger = require('../lib/logger')
const nanoid = require('nanoid/non-secure')

class BaseJob {
  static get queue() {
    return queue
  }

  // TODO: memoize this?
  static get log() {
    return logger.child({ task: this.name })
  }

  static get defaultOptions() {
    return {}
  }

  static _jobId(id) {
    return `${this.name}:${id}`
  }

  static async add(data, opts = {}) {
    // prefix jobId to fetch it later
    if (!opts.id) opts.id = nanoid()
    opts.jobId = this._jobId(opts.id)

    this.log.info({ job: { id: opts.jobId } }, 'adding job')

    return this.queue.add(
      this.name,
      data,
      Object.assign({}, this.defaultOptions, opts)
    )
  }

  static getJob(id) {
    return this.queue.getJob(this._jobId(id))
  }

  static async process() {
    throw new Error('job processing function not implemented!')
  }
}

module.exports = BaseJob
