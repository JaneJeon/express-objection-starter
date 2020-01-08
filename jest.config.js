process.env.JEST_JUNIT_OUTPUT_NAME = `reports/junit/jest/node-${process.version}/db-${process.env.KNEX_CLIENT}-results.xml`

module.exports = {
  coveragePathIgnorePatterns: ['node_modules', 'views/emails/index.js'],
  errorOnDeprecated: true,
  testEnvironment: 'node'
}
