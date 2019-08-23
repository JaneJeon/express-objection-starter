const queue = require('../lib/queue')
const logger = require('../lib/logger')

class BaseJob {
  static get log() {
    return logger.child({ task: this.name })
  }

  static get defaultOptions() {
    return {}
  }

  static async add(data, opts = {}) {
    // prefix jobId to fetch it later
    if (opts.jobId) opts.jobId = `${this.name}-${opts.jobId}`

    this.log.info('adding job', opts.jobId)

    return queue.add(this.name, data, Object.assign(opts, this.defaultOptions))
  }

  static async process(job, data) {
    throw new Error('job processing function not implemented!')
  }
}

module.exports = BaseJob
