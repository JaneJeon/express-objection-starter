const policyTester = require('../test-utils/policy-tester')

describe('user policy', () => {
  class User {
    constructor({ role, username }) {
      this.role = role
      this.username = username
    }
  }

  const regularUser = new User({ role: 'user', username: 'joe' })
  const adminUser = new User({ role: 'admin', username: 'jane' })

  describe('anonymous users', () => {
    const user = new User({ role: 'anonymous' })
    const { can, cannot } = policyTester(user, 'User')

    test('can create an account', () => {
      can('create')
    })

    test('cannot set role/verified status during signup', () => {
      cannot('create', undefined, 'role')
      cannot('create', undefined, 'verified')
    })

    test('can read users', () => {
      can('read', regularUser)
    })

    test("cannot read a user's email address", () => {
      cannot('read', regularUser, 'email')
    })

    test('cannot update/delete any user', () => {
      cannot('update', regularUser)
      cannot('delete', regularUser)
    })
  })

  describe('regular users', () => {
    const user = new User({ role: 'user', username: 'ann' })
    const { can, cannot } = policyTester(user, 'User')

    test('cannot create an account', () => {
      cannot('create')
    })

    test('can read users', () => {
      can('read', regularUser)
    })

    test("cannot read a user's email address", () => {
      cannot('read', regularUser, 'email')
    })

    test('can read their own email', () => {
      can('read', user, 'email')
    })

    test('cannot update/delete random users', () => {
      cannot('update', regularUser)
      cannot('delete', regularUser)
    })

    test('can update self', () => {
      can('update', user)
    })

    test('cannot update role/verified status', () => {
      cannot('update', user, 'role')
      cannot('update', user, 'verified')
    })

    test('can close their own account with confirmation', () => {
      can('delete', user, undefined, { confirm: true })
    })
  })

  describe('admins', () => {
    const user = new User({ role: 'admin', username: 'aimee' })
    const { can, cannot } = policyTester(user, 'User')

    test('cannot create an account', () => {
      cannot('create')
    })

    test('can read users', () => {
      can('read', regularUser)
    })

    test("cannot read a user's email address", () => {
      cannot('read', regularUser, 'email')
    })

    test('can read their own email', () => {
      can('read', user, 'email')
    })

    test("can update non-admin users' role", () => {
      cannot('update', adminUser)
      can('update', regularUser, 'role')
    })

    test('can update self', () => {
      can('update', user)
    })

    test('cannot change verified status', () => {
      cannot('update', regularUser, 'verified')
      cannot('update', user, 'verified')
    })

    test('can close only their own account with confirmation', () => {
      can('delete', user, undefined, { confirm: true })
      cannot('delete', regularUser, undefined, { confirm: true })
    })
  })
})
