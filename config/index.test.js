const config = require('.')

describe('config loader', () => {
  test('loads environment variables', () => {
    expect(config.get('node:env')).toEqual('test')
  })

  test('loads the right environment', () => {
    expect(config.get('logger:options:level')).toBe('error')
  })

  test('loads default variables', () => {
    expect(config.get('mail:smtp:service')).toBeDefined()
  })

  test('loads schema/relations', () => {
    expect(config.get('schema')).toBeDefined()
  })
})
