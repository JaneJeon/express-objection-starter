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
    it('should create account', async () => {
      const res = await request
        .post('/account')
        .send({ username, password, email })
      expect(res.status).toBe(201)
    })
  })

  describe('GET /account', () => {
    it('should return current user', async () => {
      const res = await request.get('/account')
      expect(res.body.username).toEqual(username)
    })
  })

  describe('POST /account/verify', () => {
    it.skip('should send password verification link', async () => {
      // TODO:
    })
  })

  describe('PATCH /account/verify/:token', () => {
    it.skip('should verify user', async () => {
      // TODO:
    })
  })

  describe('POST /account/forgot/:email', () => {
    it.skip('should send password reset link', async () => {
      // TODO:
    })
  })

  describe('PATCH /account/reset/:token', () => {
    it.skip('should reset password', async () => {
      // TODO:
    })
  })

  describe('GET /users/:username', () => {
    it('should get user', async () => {
      const res = await request.get(`/users/${username}`)
      expect(res.status).toBe(200)
    })
  })

  describe('PATCH /users/:username', () => {
    it('should update user', async () => {
      const res = await request
        .patch(`/users/${username}`)
        .send({ email: 'test.users.2@gmail.com' })
      expect(res.status).toBe(200)
    })
  })

  describe('DELETE /account', () => {
    it('should close account', async () => {
      const res = await request.delete('/account').send({ confirm: true })
      expect(res.status).toBe(204)
    })
  })
})
