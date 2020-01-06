// we want to discourage people from signing up with disposable emails
const domains = require('disposable-email-domains')
const wildcards = require('disposable-email-domains/wildcard')
const assert = require('http-assert')

const domainMap = Object.assign(...domains.map(k => ({ [k]: true })))
const wildcardMap = Object.assign(...wildcards.map(k => ({ [k]: true })))

/**
 * @param {string} email
 */
module.exports = email => {
  // checking straight match is a simple single K/V lookup
  const domain = email.split('@')[1]
  let isTempEmail = domainMap[domain]

  // If checking regular domains didn't work, it might be possible that
  // ~~IT'S A WORK OF AN ENEMY STAND~~ it matches a wildcard domain instead.
  if (!isTempEmail) {
    const domainParts = domain.split('.')
    // looking at wildcard.json reveals that all of the wildcards are 2 or 3 "lengths":
    // i.e. either *.x.y or *.x.y.z.
    // So if our email has the domain x.y, we lookup x.y,
    // and if it were x.y.z, we lookup x.y and x.y.z.
    const domainSuffixLengths = domainParts.length > 2 ? [2, 3] : [2]
    const domainSuffixes = domainSuffixLengths.map(n =>
      domainParts.slice(domainParts.length - n, domainParts.length).join('.')
    )
    isTempEmail = domainSuffixes.reduce(
      (matched, domainSuffix) => matched || wildcardMap[domainSuffix],
      false
    )
  }

  assert(
    !isTempEmail,
    400,
    'Unsupported email address. Please enter a different email.'
  )
}
