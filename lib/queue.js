const Bull = require('bull')
const { createClient } = require('./redis')
const merge = require('lodash/merge')
const log = require('./logger')
const config = require('../config')
const pick = require('lodash/pick')

const queue = new Bull(
  'jobs',
  Object.assign(config.get('queue:default'), { createClient })
)
const mailQueue = new Bull(
  'mail',
  merge(config.get('queue:mail'), config.get('queue:default'), { createClient })
)

const extractMeta = job => pick(job, ['id', 'name'])

;[queue, mailQueue].forEach(queue => {
  // https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#events
  queue
    .on('paused', () => {
      // The queue has been paused.
      log.info('Queue paused')
    })
    .on('resumed', job => {
      // The queue has been resumed.
      log.info({ job: extractMeta(job) }, 'Queue resumed')
    })
    .on('cleaned', (jobs, type) => {
      // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
      // jobs, and `type` is the type of jobs cleaned.
      log.info({ jobs: jobs.map(extractMeta), type }, 'Queue cleaned')
    })
    .on('drained', () => {
      // Emitted every time the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed)
      log.info('Queue drained')
    })
    .on('error', err => {
      // An error occured.
      log.error(err, 'Queue error')
    })
    .on('waiting', jobId => {
      // A Job is waiting to be processed as soon as a worker is idling.
      log.info({ job: { id: jobId } }, 'Job waiting')
    })
    // eslint-disable-next-line no-unused-vars
    .on('active', (job, jobPromise) => {
      // A job has started. You can use `jobPromise.cancel()`` to abort it.
      log.info({ job: extractMeta(job) }, 'Job started')
    })
    .on('stalled', job => {
      // A job has been marked as stalled. This is useful for debugging job
      // workers that crash or pause the event loop.
      log.warn({ job }, 'Job stalled')
    })
    .on('completed', (job, result) => {
      // A job successfully completed with a `result`.
      log.info({ job: extractMeta(job), result }, 'Job completed')
    })
    .on('failed', (job, err) => {
      // A job failed with reason `err`!
      log.error({ job, err }, 'Job failed')
    })
    .on('removed', job => {
      // A job successfully removed.
      log.info({ job: extractMeta(job) }, 'Job removed')
    })
})

module.exports = queue
module.exports.mailQueue = mailQueue
