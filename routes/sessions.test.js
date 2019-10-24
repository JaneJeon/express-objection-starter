const app = require('../app')
const supertest = require('supertest-session')
const User = require('../models/user')

describe('session routes', () => {
  const request = supertest(app)

  const username = 'test_sessions'
  const password = '123456789'
  const email = 'test.sessions@gmail.com'

  beforeAll(async () => {
    await User.query()
      .delete()
      .where({ username })
    await User.query().insert({ username, password, email })
  })

  describe('POST /login', () => {
    it('should work', async () => {
      const res = await request.post('/login').send({ username, password })
      expect(res.status).toBe(201)
    })
  })

  // tests to be written after revamp of active sessions
  describe.skip('GET /sessions', () => {
    // TODO:
  })

  describe.skip('DELETE /sessions/:sessId', () => {
    // TODO:
  })

  describe('DELETE /logout', () => {
    it('should work', async () => {
      const res = await request.delete('/logout')
      expect(res.status).toBe(204)
    })
  })
})
