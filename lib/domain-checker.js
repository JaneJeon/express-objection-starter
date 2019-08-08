// this module exists because I want to rely on JSON schema for email validation,
// instead of having to check it twice with mailchecker
// (which sadly doesn't export isBlacklisted on its own)
const { blacklist } = require('mailchecker')
const assert = require('http-assert')

// https://github.com/FGRibreau/mailchecker/blob/master/platform/node/index.js
function allDomainSuffixes(email) {
  var domainComponents = email.split('@')[1].split('.')

  return range(0, domainComponents.length).map(function(n) {
    return domainComponents.slice(n).join('.')
  })
}

function isBlacklisted(email) {
  function suffixIsBlacklisted(domainSuffix) {
    return blacklist.indexOf(domainSuffix) >= 0
  }

  return allDomainSuffixes(email).some(suffixIsBlacklisted)
}

module.exports = email =>
  assert(
    !isBlacklisted(email),
    400,
    'This email is not supported. Please choose a different address.'
  )
