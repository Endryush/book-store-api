import request from 'supertest';
import app from '../src/server'

const validPayload = {
  name: "clientNAme",
  email: "email@email.com",
  phone: "454545",
  password: "senhaforte",
  address: "rua xcv, 0 - lalala",
  id: 0
}

const getByIdResponse = {
  name: "clientNAme",
  email: "email@email.com",
  phone: "454545",
  password: "senhaforte",
  address: "rua xcv, 0 - lalala",
  id: 0
}

describe('Testing API POST on /client', () => {
  test('invalid Payload', async () => {
    const response = await request(app)
      .post('/api/client')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send({})

      expect(response.status).toBe(400)
  })

  test ('validPayload', async () => {
    const response = await request(app)
      .post('/api/client')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send(validPayload)

    expect(response.status).toBe(201)
  })
})

describe ('Testing  PUT /client', () => {
  test('Valid Client', async () => {
    const payload = {
      ...validPayload
    }
    payload.id = '0'
    const response = await request(app)
      .put('/api/client')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send(payload)

    expect(response.status).toBe(200)
  })

  test('NotFoundClient', async () => {
    const payload = {
      ...validPayload
    }
    payload.id = -1
    const response = await request(app)
      .put( '/api/client')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send(payload)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Client not Found")
  })

  test('With No Id Informed', async () => {
    const payload = { ...validPayload }
    delete payload.id

    const response = await request(app)
      .put('/api/client')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send(validPayload)
    
      expect(response.status).toBe(400)
      expect(response.body.error).toBe("Client ID is required")
  })
})

describe('Testing API GET on /client', () => {
  test('Not Found Client', async () => {
    const response = await request(app)
      .get('/api/client/-1')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send()
    
    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Client not found")
  })

  test('Valid client', async () => {
    const response = await request(app)
      .get('/api/client/0')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot(getByIdResponse)
  })

  test('Get All Clients', async () => {
    const response = await request(app)
      .get('/api/client')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send()

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
  })
})

describe('Testing API DELETE on /client', () => {
  test('Deleting  a non-existing client', async () => {
    const response = await request(app)
      .delete('/api/client/98765')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send()

    expect(response.status).toBe(404)
  });

  test('Deleting TEST user on /client', async () => {
    const response = await request(app)
    .delete('/api/client/0')
    .auth(process.env.JEST_USR, process.env.JEST_PASS)
    .send()

   expect(response.status).toBe(204)
  })
})