const acl = require('../lib/acl')

describe('access control', () => {
  describe('user resource', () => {
    describe('anonymous', () => {
      const role = 'anonymous'

      test('can read user', () => {
        expect(
          acl
            .can(role)
            .execute('read')
            .on('User').granted
        ).toBe(true)
      })

      test('cannot read email property', () => {
        expect(
          acl
            .can(role)
            .execute('read')
            .on('User')
            .filter({ email: true }).email
        ).toBeUndefined()
      })

      test('can create user', () => {
        expect(
          acl
            .can(role)
            .execute('create')
            .on('User').granted
        ).toBe(true)
      })

      test('cannot set role', () => {
        expect(
          acl
            .can(role)
            .execute('create')
            .on('User')
            .filter({ role: true }).role
        ).toBeUndefined()
      })

      test('cannot update/delete', () => {
        expect(
          acl
            .can(role)
            .execute('update')
            .on('User').granted
        ).toBe(false)

        expect(
          acl
            .can(role)
            .execute('delete')
            .on('User').granted
        ).toBe(false)
      })
    })

    describe('user', () => {
      const role = 'user'

      test('can read user', () => {
        expect(
          acl
            .can(role)
            .execute('read')
            .on('User').granted
        ).toBe(true)
      })

      test('cannot read email property', () => {
        expect(
          acl
            .can(role)
            .execute('read')
            .on('User')
            .filter({ email: true }).email
        ).toBeUndefined()

        expect(
          acl
            .can(role)
            .execute('read')
            .with({ username: 'hasan', req: { user: { username: 'minaj' } } })
            .on('User')
            .filter({ email: true }).email
        ).toBeUndefined()
      })

      test('can read own email address', () => {
        expect(
          acl
            .can(role)
            .execute('read')
            .with({ username: 'uno', req: { user: { username: 'uno' } } })
            .on('User')
            .filter({ email: true }).email
        ).toBe(true)
      })

      test('cannot create user', () => {
        expect(
          acl
            .can(role)
            .execute('create')
            .on('User').granted
        ).toBe(false)
      })

      test('cannot update/delete by default', () => {
        expect(
          acl
            .can(role)
            .execute('update')
            .on('User').granted
        ).toBe(false)

        expect(
          acl
            .can(role)
            .execute('delete')
            .on('User').granted
        ).toBe(false)
      })

      test('can update self', () => {
        expect(
          acl
            .can(role)
            .execute('update')
            .with({ username: 'uno', req: { user: { username: 'uno' } } })
            .on('User').granted
        ).toBe(true)
      })

      // this only works with objection-authorize plugin hydrating true/false values
      test.skip('can only delete self with confirmation', () => {
        expect(
          acl
            .can(role)
            .execute('delete')
            .with({ username: 'uno', req: { body: { username: 'uno' } } })
            .on('User').granted
        ).toBe(true)
      })

      test('cannot set role', () => {
        expect(
          acl
            .can(role)
            .execute('update')
            .on('User').granted
        ).toBe(false)
      })
    })

    describe('admin', () => {
      const role = 'admin'

      test('extends user', () => {
        expect(
          acl
            .can(role)
            .execute('read')
            .with({ username: 'uno', req: { user: { username: 'uno' } } })
            .on('User')
            .filter({ email: true }).email
        ).toBe(true)
      })

      test('can update role of non-admins', () => {
        expect(
          acl
            .can(role)
            .execute('update')
            .with({ role: 'user' })
            .on('User').granted
        ).toBe(true)

        expect(
          acl
            .can(role)
            .execute('update')
            .with({ role: 'admin' })
            .on('User').attributes
        ).toContain('!role')
      })
    })
  })
})
