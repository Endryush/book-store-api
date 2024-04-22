import request from 'supertest';
import app from '../src/server'

describe('Testing API on /health-check', () => {
  test('get / health-check', async () => {
    const res = await request(app)
      .get('/api/health-check')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)

      expect(res.status).toBe(200)
  })
})