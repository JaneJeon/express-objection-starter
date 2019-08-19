const acl = require('./acl')

describe('abilities builder', () => {
  describe('User', () => {
    class User {
      constructor({ id, role }) {
        this.id = id
        this.role = role
      }
    }

    const user1 = new User({ id: 1, role: 'user' })
    const user2 = new User({ id: 2, role: 'user' })
    const admin = new User({ id: 3, role: 'admin' })

    user1.ability = acl(user1)
    user2.ability = acl(user2)
    admin.ability = acl(admin)
    const anon = { ability: acl(undefined) }

    describe('C', () => {
      test('only anonymous users can create profile', () => {
        expect(anon.ability.can('create', 'User')).toBe(true)
        expect(user1.ability.can('create', 'User')).toBe(false)
        expect(admin.ability.can('create', 'User')).toBe(false)
      })

      test('users cannot specify certain fields when creating', () => {
        // TODO: update test
        expect(anon.ability.can('create', 'User', 'role,deleted')).toBe(false)
      })
    })

    describe('R', () => {
      test("anyone can read a user's public information", () => {
        expect(anon.ability.can('read', 'User', 'username')).toBe(true)
        expect(user1.ability.can('read', user2, 'role')).toBe(true)
      })

      test('only users can view their own email', () => {
        expect(user1.ability.can('read', user1, 'email')).toBe(true)
        expect(user2.ability.can('read', user1, 'email')).toBe(false)
      })

      test("no one gets to see ANYONE's password", () => {
        expect(user1.ability.can('read', user1, 'password')).toBe(false)
        expect(admin.ability.can('read', user1, 'password')).toBe(false)
      })
    })

    describe('U', () => {
      test('users can only edit their own profile', () => {
        //
      })

      test('users are not allowed to change certain fields', () => {
        //
      })

      test("admins can change others' roles", () => {
        //
      })
    })

    describe('D', () => {
      test('users can only delete their own profile', () => {
        expect(user1.ability.can('delete', user1)).toBe(true)
        expect(user2.ability.can('delete', user1)).toBe(false)
      })

      test("annonymous users shouldn't even see the delete option", () => {
        expect(anon.ability.can('delete', 'User')).toBe(false)
      })
    })
  })
})
