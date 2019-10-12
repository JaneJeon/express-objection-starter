const acl = require('../lib/acl')

describe('access control', () => {
  beforeAll(async () => {
    await acl.initialize()
  })

  describe('user resource', () => {
    describe('anonymous', () => {
      const role = 'anonymous'

      test('can read user', async () => {
        const access = await acl
          .can(role)
          .execute('read')
          .on('User')
        expect(access.granted).toBe(true)
      })

      test('cannot read email property', async () => {
        const access = await acl
          .can(role)
          .execute('read')
          .on('User')
        expect(access.filter({ email: true }).email).toBeUndefined()
      })

      test('can create user', async () => {
        const access = await acl
          .can(role)
          .execute('create')
          .on('User')
        expect(access.granted).toBe(true)
      })

      test('cannot set role', async () => {
        const access = await acl
          .can(role)
          .execute('create')
          .on('User')
        expect(access.filter({ role: true }).role).toBeUndefined()
      })

      test('cannot update/delete', async () => {
        let access = await acl
          .can(role)
          .execute('update')
          .on('User')
        expect(access.granted).toBe(false)

        access = await acl
          .can(role)
          .execute('delete')
          .on('User')
        expect(access.granted).toBe(false)
      })
    })

    describe('user', () => {
      const role = 'user'

      test('can read user', async () => {
        const access = await acl
          .can(role)
          .execute('read')
          .on('User')
        expect(access.granted).toBe(true)
      })

      test('cannot read email property', async () => {
        let access = await acl
          .can(role)
          .execute('read')
          .on('User')
        expect(access.filter({ email: true }).email).toBeUndefined()

        access = await acl
          .can(role)
          .execute('read')
          .with({ username: 'hasan', req: { user: { username: 'minhaj' } } })
          .on('User')
        expect(access.filter({ email: true }).email).toBeUndefined()
      })

      test('can read own email address', async () => {
        const access = await acl
          .can(role)
          .execute('read')
          .with({ username: 'uno', req: { user: { username: 'uno' } } })
          .on('User')
        expect(access.filter({ email: true }).email).toBe(true)
      })

      test('cannot create user', async () => {
        const access = await acl
          .can(role)
          .execute('create')
          .on('User')
        expect(access.granted).toBe(false)
      })

      test('cannot update/delete by default', async () => {
        let access = await acl
          .can(role)
          .execute('update')
          .on('User')
        expect(access.granted).toBe(false)

        access = await acl
          .can(role)
          .execute('delete')
          .on('User')
        expect(access.granted).toBe(false)
      })

      test('can update self', async () => {
        const access = await acl
          .can(role)
          .execute('update')
          .with({ username: 'uno', req: { user: { username: 'uno' } } })
          .on('User')
        expect(access.granted).toBe(true)
      })

      // this only works with objection-authorize plugin hydrating true/false values
      test.skip('can only delete self with confirmation', async () => {
        const access = await acl
          .can(role)
          .execute('delete')
          .with({ username: 'uno', req: { body: { username: 'uno' } } })
          .on('User')
        expect(access.granted).toBe(true)
      })

      test('cannot set role', async () => {
        const access = await acl
          .can(role)
          .execute('update')
          .on('User')
        expect(access.granted).toBe(false)
      })
    })

    describe('admin', () => {
      const role = 'admin'

      test('extends user', async () => {
        const access = await acl
          .can(role)
          .execute('read')
          .with({ username: 'uno', req: { user: { username: 'uno' } } })
          .on('User')
        expect(access.filter({ email: true }).email).toBe(true)
      })

      test('can update role of non-admins', async () => {
        let access = await acl
          .can(role)
          .execute('update')
          .with({ role: 'user' })
          .on('User')
        expect(access.granted).toBe(true)
        console.log(access)

        access = await acl
          .can(role)
          .execute('update')
          .with({ role: 'admin' })
          .on('User')
        console.log(access)
        expect(access.filter({ role: 'user' }).role).toBeUndefined()
      })
    })
  })
})
