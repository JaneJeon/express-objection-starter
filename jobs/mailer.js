const BaseJob = require('./base')
const { mailQueue } = require('../lib/queue')
const mail = require('../lib/mail')

class Mailer extends BaseJob {
  static get queue() {
    return mailQueue
  }

  // TODO: should we handle err.responseCode == 429?
  static async process(job) {
    return mail.sendMail(job)
  }

  static async runOrCreate(id, data, opts) {
    const job = await this.queue.getJob(this.jobId(id))

    return job ? job.promote() : this.add(data, opts)
  }
}

module.exports = Mailer
