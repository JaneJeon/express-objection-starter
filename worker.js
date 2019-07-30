const queue = require("./services/queue")
const log = require("./services/logger")

// https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#events
queue
  .on("stalled", job => {
    log.warn("Job stalled:", job)
  })
  .on("failed", (job, err) => {
    log.error("Job failed: %s", err, job)
  })
  .on("error", err => {
    log.error("Unexpected error from queue: %s", err)
  })
