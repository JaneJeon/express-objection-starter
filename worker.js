const queue = require("./services/queue")

// https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#events
queue
  .on("stalled", job => {
    // TODO:
  })
  .on("failed", (job, err) => {
    // TODO:
    console.error(err)
  })
  .on("error", console.error)
