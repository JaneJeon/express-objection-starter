const app = require('../server')
const supertest = require('supertest-session')
const User = require('../models/user')

describe('user routes', () => {
  const request = supertest(app)

  const username = 'test_users'
  const password = '123456789'
  const email = 'test.users@gmail.com'

  beforeAll(async () => {
    await User.query()
      .delete()
      .where({ username })
  })

  describe('POST /account', () => {
    it('should work', async () => {
      const res = await request
        .post('/account')
        .send({ username, password, email })
      expect(res.status).toBe(201)
    })
  })

  describe('GET /users/:username', () => {
    it('should work', async () => {
      const res = await request.get(`/users/${username}`)
      expect(res.status).toBe(200)
    })
  })

  describe('PATCH /users/:username', () => {
    it('should work', async () => {
      const res = await request
        .patch(`/users/${username}`)
        .send({ email: 'test.users.2@gmail.com' })
      expect(res.status).toBe(200)
    })
  })

  describe('DELETE /account', () => {
    it('should work', async () => {
      const res = await request.delete('/account').send({ username })
      expect(res.status).toBe(204)
    })
  })
})
