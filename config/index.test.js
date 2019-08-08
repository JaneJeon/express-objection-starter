const config = require('.')

test('loads the right environment', () => {
  expect(config.get('logger:destination')).toBeTruthy()
})

test('loads default variables', () => {
  expect(config.get('mail:smtp:service')).toBeTruthy()
})

test('loads acl/schema', () => {
  expect(config.get('acl')).toBeTruthy()
  expect(config.get('schema')).toBeTruthy()
})
