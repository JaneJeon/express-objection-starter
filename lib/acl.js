const AccessControl = require('role-acl')

const acl = require('../config/acl')
const ac = new AccessControl(acl)

for (const role in acl)
  if (acl[role].extends)
    ac.extendRole(role, acl[role].extends.role, acl[role].extends.condition)

module.exports = ac
