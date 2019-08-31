const queue = require('../lib/queue')
const logger = require('../lib/logger')

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

  static jobId(id) {
    return `${this.name}-${id}`
  }

  static async add(data, opts = {}) {
    // prefix jobId to fetch it later
    if (opts.jobId) opts.jobId = this.jobId(opts.jobId)

    this.log.info('adding job', opts.jobId)

    return this.queue.add(
      this.name,
      data,
      Object.assign(opts, this.defaultOptions)
    )
  }

  // eslint-disable-next-line no-unused-vars
  static async process(job, data) {
    throw new Error('job processing function not implemented!')
  }
}

module.exports = BaseJob
