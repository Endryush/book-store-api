import request from 'supertest';
import app from '../src/server'
// TO DO: Implement logic that create and manipulate the same user, and then delete it.
const validPayload = {
  name: "clientNAme",
  email: "email@email.com",
  phone: "454545",
  password: "senhaforte",
  address: "rua xcv, 0 - lalala"
}

const getByIdResponse = {
  id: 1,
  name: "Andre da silva",
  email: "andre@email.com",
  password: "senhaultraforte",
  phone: "848456569",
  address: "rua xcv, 0 - lalala"
}

describe('Testing API POST on /client', () => {
  test('invalid Payload', async () => {
    const response = await request(app)
      .post('/api/client')
      .send({})

      expect(response.status).toBe(400)
  })

  test ('validPayload', async () => {
    const response = await request(app)
      .post('/api/client')
      .send(validPayload)

    expect(response.status).toBe(201)
  })
})

describe ('Testing  PUT /client', () => {
  test('NotFoundClient', async () => {
    const response = await request(app)
      .put( '/api/client')
      .send({
        ...validPayload,
        id: 8797897897987
      })

    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Client not Found")
  })

  test('With No Id Informed', async () => {
    const response = await request(app)
      .put('/api/client')
      .send(validPayload)
    
      expect(response.status).toBe(400)
      expect(response.body.error).toBe("Client ID is required")
  })

  test('Valid Client', async () => {
    const updatedPayload = {
      ...validPayload,
      id: 2
    }
    const response = await request(app)
      .put('/api/client')
      .send(updatedPayload)

    expect(response.status).toBe(200)
  })
})

describe('Testing API GET on /client', () => {
  test('Not Found Client', async () => {
    const response = await request(app)
      .get('/api/client/15634')
      .send()
    
    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Client not found")
  })

  test('Valid client', async () => {
    const response = await request(app)
      .get('/api/client/1')
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(getByIdResponse)
  })

  test('Get All Clients', async () => {
    const response = await request(app)
      .get('/api/client')
      .send()

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
  })
})

describe('Testing API DELETE on /client', () => {
  test('Deleting  a non-existing client', async () => {
    const response = await request(app)
      .delete('/api/client/98765')
      .send()

    expect(response.status).toBe(404)
  });
})