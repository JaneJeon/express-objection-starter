const filterTempEmail = require('./filter-temp-email')

describe('Temporary Email Address Filter Service', () => {
  test("doesn't block legitimate email addresses", () => {
    filterTempEmail('asdf@gmail.com')
    filterTempEmail('ilya@mail.ru')
  })

  test('matches throwaway email domains', () => {
    expect(() => filterTempEmail('spam@10minutemail.com')).toThrow()
    expect(() => filterTempEmail('spam@1.atm-mi.tk')).toThrow()
    expect(() => filterTempEmail('spam@no.tap.tru.io')).toThrow()
  })

  test('matches throwaway email wildcard domains', () => {
    expect(() => filterTempEmail('spam@wildcard.10mail.org')).toThrow()
    expect(() => filterTempEmail('spam@wildcard.cad.edu.gr')).toThrow()
  })
})
