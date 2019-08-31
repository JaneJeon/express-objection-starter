const isCI = require('is-ci')

module.exports = {
  collectCoverage: isCI,
  reporters: isCI ? ['default', 'jest-junit'] : ['default']
}
