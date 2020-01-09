const app = require('../app')
const supertest = require('supertest-session')
const User = require('../models/user')

describe('user routes', () => {
  const request = supertest(app)

  const username = 'test_users'
  const password = '123456789'
  const email = 'test.users@gmail.com'

  beforeAll(async () => {
    await Promise.all([
      User.query()
        .delete()
        .where({ username }),
      app.initialize()
    ])
  })

  describe('POST /users', () => {
    it('should create account', async () => {
      const res = await request
        .post('/users')
        .send({ username, password, email })
      expect(res.status).toBe(201)
    })
  })

  describe('GET /user', () => {
    it('should return current user', async () => {
      const res = await request.get('/user')
      expect(res.body.username).toEqual(username)
    })
  })

  describe('POST /user/verify', () => {
    it.skip('should send password verification link', async () => {
      // TODO:
    })
  })

  describe('PATCH /user/verify/:token', () => {
    it.skip('should verify user', async () => {
      // TODO:
    })
  })

  describe('POST /user/forgot/:email', () => {
    it.skip('should send password reset link', async () => {
      // TODO:
    })
  })

  describe('PATCH /user/reset/:token', () => {
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

  describe('DELETE /user', () => {
    it('should close account', async () => {
      const res = await request.delete('/user').send({ confirm: true })
      expect(res.status).toBe(204)
    })
  })
})
