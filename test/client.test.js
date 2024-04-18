import request from 'supertest';
import app from '../src/server'

const validPayload = {
  name: "clientNAme",
  email: "email@email.com",
  phone: "454545",
  password: "senhaforte",
  address: "rua xcv, 0 - lalala"
}

describe('Testing API on /client', () => {
  test('POST /client invalid Payload', async () => {
    const response = await request(app)
      .post('/api/client')
      .send({})

      expect(response.status).toBe(400)
  })

  test ('POST /client with validPayload', async () => {
    const response = await request(app)
      .post('/api/client')
      .send(validPayload)

    expect(response.status).toBe(201)
  })
})