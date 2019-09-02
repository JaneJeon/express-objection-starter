const fs = require('fs')

// https://stackoverflow.com/a/44987701
fs.readdirSync(`${__dirname}/jobs`)
  .filter(file => file.endsWith('.js') && file != 'base.js')
  .forEach(job => {
    const jobClass = require(`./jobs/${job}`)
    jobClass.queue.process(jobClass.name, jobClass.process)
  })
