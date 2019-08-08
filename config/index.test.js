const config = require('.')

test('loads environment variables', () => {
  expect(config.get('node:env')).toEqual('test')
})

test('loads the right environment', () => {
  expect(config.get('logger:destination')).toBeDefined()
})

test('loads default variables', () => {
  expect(config.get('mail:smtp:service')).toBeDefined()
})

test('loads acl/schema', () => {
  expect(config.get('acl')).toBeDefined()
  expect(config.get('schema')).toBeDefined()
})
