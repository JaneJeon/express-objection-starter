exports.create = (allow, forbid, user, body) => {
  if (user.role === 'anonymous') {
    allow('create', 'User')
    forbid('create', 'User', ['role', 'verified'])
  }
}

exports.read = (allow, forbid, user, body) => {
  allow('read', 'User')
  forbid('read', 'User', 'email')
  allow('read', 'User', 'email', { username: user.username })
}

exports.update = (allow, forbid, user, body) => {
  allow('update', 'User', { username: user.username })
  forbid('update', 'User', ['role', 'verified'])
  if (user.role === 'admin')
    allow('update', 'User', 'role', { role: { $ne: 'admin' } })
}

exports.delete = (allow, forbid, user, body) => {
  if (body.confirm) allow('delete', 'User', { username: user.username })
}
