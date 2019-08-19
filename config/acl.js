const { AbilityBuilder } = require('@casl/ability')

function defineAbilitiesFor(user = {}) {
  return AbilityBuilder.define((can, cannot) => {
    // default
    can('crud', 'User', { id: user.id })

    // can read anyone's user info EXCEPT password/email by default
    cannot('read', 'User', ['password', 'email'])
    // but a user can read their own email
    can('read', 'User', ['email'], { id: user.id })

    // only allow anonymous users to create account
    if (!user) can('create', 'User')
    // do not allow users to set these fields
    cannot(['create', 'update'], 'User', [
      'verified',
      'role',
      'banned',
      'deleted'
    ])
    // don't allow people to update username
    cannot('update', 'User', ['username'])
    if (user.role == 'admin') can('update', 'User', ['role', 'banned'])
  })
}

module.exports = defineAbilitiesFor
