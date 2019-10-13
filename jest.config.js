const isCI = require('is-ci')
process.env.JEST_JUNIT_OUTPUT_NAME = `reports/junit/jest/node-${process.version}results.xml`

module.exports = {
  collectCoverage: isCI,
  coveragePathIgnorePatterns: ['node_modules', 'views/emails/index.js'],
  errorOnDeprecated: true,
  reporters: isCI ? ['default', 'jest-junit'] : undefined,
  testEnvironment: 'node'
}
