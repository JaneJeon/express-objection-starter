const acl = require('./acl')

describe('access control', () => {
  describe('user resource', () => {
    describe('anonymous', () => {
      const role = 'anonymous'

      test('can read user', () => {
        expect(
          acl
            .can(role)
            .execute('read')
            .on('user').granted
        ).toBe(true)
      })

      test('cannot read email property', () => {
        expect(
          acl
            .can(role)
            .execute('read')
            .on('user')
            .filter({ email: true }).email
        ).toBeUndefined()
      })

      test('can create user', () => {
        expect(
          acl
            .can(role)
            .execute('create')
            .on('user').granted
        ).toBe(true)
      })

      test('cannot set role', () => {
        expect(
          acl
            .can(role)
            .execute('create')
            .on('user')
            .filter({ role: true }).role
        ).toBeUndefined()
      })

      test('cannot update/delete', () => {
        expect(
          acl
            .can(role)
            .execute('update')
            .on('user').granted
        ).toBe(false)

        expect(
          acl
            .can(role)
            .execute('delete')
            .on('user').granted
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
            .on('user').granted
        ).toBe(true)
      })

      test('cannot read email property', () => {
        expect(
          acl
            .can(role)
            .execute('read')
            .on('user')
            .filter({ email: true }).email
        ).toBeUndefined()

        expect(
          acl
            .can(role)
            .execute('read')
            .with({ requester: 1, user: { id: 2 } })
            .on('user')
            .filter({ email: true }).email
        ).toBeUndefined()
      })

      test('can read own email address', () => {
        expect(
          acl
            .can(role)
            .execute('read')
            .with({ requester: 1, user: { id: 1 } })
            .on('user')
            .filter({ email: true }).email
        ).toBe(true)
      })

      test('cannot create user', () => {
        expect(
          acl
            .can(role)
            .execute('create')
            .on('user').granted
        ).toBe(false)
      })

      test('cannot update/delete by default', () => {
        expect(
          acl
            .can(role)
            .execute('update')
            .on('user').granted
        ).toBe(false)

        expect(
          acl
            .can(role)
            .execute('delete')
            .on('user').granted
        ).toBe(false)
      })

      test('can update/delete self', () => {
        expect(
          acl
            .can(role)
            .execute('update')
            .with({ requester: 1, user: { id: 1 } })
            .on('user').granted
        ).toBe(true)

        expect(
          acl
            .can(role)
            .execute('delete')
            .with({ requester: 1, user: { id: 1 } })
            .on('user').granted
        ).toBe(true)
      })

      test('cannot set role', () => {
        expect(
          acl
            .can(role)
            .execute('update')
            .on('user').granted
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
            .with({ requester: 1, user: { id: 1 } })
            .on('user')
            .filter({ email: true }).email
        ).toBe(true)
      })

      test('can update role of non-admins', () => {
        expect(
          acl
            .can(role)
            .execute('update')
            .with({ role: 'user' })
            .on('user').granted
        ).toBe(true)

        expect(
          acl
            .can(role)
            .execute('update')
            .with({ role: 'admin' })
            .on('user').attributes
        ).toContain('!role')
      })
    })
  })
})
