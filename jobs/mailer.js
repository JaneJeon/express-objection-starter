const BaseJob = require('./base')
const { mailQueue } = require('../lib/queue')
const mail = require('../lib/mail')

class Mailer extends BaseJob {
  static get queue() {
    return mailQueue
  }

  // TODO: should we handle err.responseCode == 429?
  static async process(job) {
    return mail.sendMail(job.data)
  }

  static async runOrAdd(data, opts = {}) {
    if (!opts.id) throw new Error('required parameter: opts.id')
    const job = await this.getJob(opts.id)

    return job ? job.promote() : this.add(data, opts)
  }
}

module.exports = Mailer
