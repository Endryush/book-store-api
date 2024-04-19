import request from 'supertest';
import app from '../src/server'

const validPayload = {
  name: "bookNAme",
  value: 40.5,
  stock: 12,
  id: 0,
  authorId: 2
}

const getByIdResponse = {
  name: "bookNAme",
  value: 40.5,
  stock: 12,
  id: 0,
  authorId: 2
}

describe('Testing API POST on /book', () => {
  test('invalid Payload', async () => {
    const response = await request(app)
      .post('/api/book')
      .send({})

      expect(response.status).toBe(400)
  })

  test ('validPayload', async () => {
    const response = await request(app)
      .post('/api/book')
      .send(validPayload)

    expect(response.status).toBe(201)
  })
})

describe ('Testing  PUT /book', () => {
  test('Valid Book', async () => {
    const payload = {
      ...validPayload
    }
    payload.id = '0'
    const response = await request(app)
      .put('/api/book')
      .send(payload)

    expect(response.status).toBe(200)
  })

  test('NotFoundBook', async () => {
    const payload = {
      ...validPayload
    }
    payload.id = -1
    const response = await request(app)
      .put( '/api/book')
      .send(payload)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Book not Found")
  })

  test('With No Id Informed', async () => {
    const payload = { ...validPayload }
    delete payload.id

    const response = await request(app)
      .put('/api/book')
      .send(validPayload)
    
      expect(response.status).toBe(400)
      expect(response.body.error).toBe("Book ID is required")
  })
})

describe('Testing API GET on /book', () => {
  test('Not Found Book', async () => {
    const response = await request(app)
      .get('/api/book/-1')
      .send()
    
    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Book not found")
  })

  test('Valid book', async () => {
    const response = await request(app)
      .get('/api/book/0')
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(getByIdResponse)
  })

  test('Get All Books', async () => {
    const response = await request(app)
      .get('/api/book')
      .send()

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
  })
})

describe('Testing API DELETE on /book', () => {
  test('Deleting  a non-existing book', async () => {
    const response = await request(app)
      .delete('/api/book/98765')
      .send()

    expect(response.status).toBe(404)
  });

  test('Deleting TEST user on /book', async () => {
    const response = await request(app)
    .delete('/api/book/0')
    .send()

   expect(response.status).toBe(204)
  })
})