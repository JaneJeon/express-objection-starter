const queue = require("./services/queue")
const log = require("./services/logger")

// https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#events
queue
  .on("stalled", job => {
    log.warn({ job }, "Job stalled")
  })
  .on("failed", (job, err) => {
    log.error({ job, err }, "Job failed")
  })
  .on("error", err => {
    log.error({ err }, "Unexpected error from queue")
  })
