import request from 'supertest';
import app from '../src/server'

const validPayload = {
  name: "authorNAme",
  email: "author@email.com",
  phone: "454545",
  id: 0
}

const getByIdResponse = {
  name: "authorNAme",
  email: "author@email.com",
  phone: "454545",
  id: 0
}

describe('Testing API POST on /author', () => {
  test('invalid Payload', async () => {
    const response = await request(app)
      .post('/api/author')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send({})

      expect(response.status).toBe(400)
  })

  test ('validPayload', async () => {
    const response = await request(app)
      .post('/api/author')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send(validPayload)

    expect(response.status).toBe(201)
  })
})

describe ('Testing  PUT /author', () => {
  test('Valid Author', async () => {
    const payload = {
      ...validPayload
    }
    payload.id = '0'
    const response = await request(app)
      .put('/api/author')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send(payload)

    expect(response.status).toBe(200)
  })

  test('NotFoundAuthor', async () => {
    const payload = {
      ...validPayload
    }
    payload.id = -1
    const response = await request(app)
      .put( '/api/author')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send(payload)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Author not Found")
  })

  test('With No Id Informed', async () => {
    const payload = { ...validPayload }
    delete payload.id

    const response = await request(app)
      .put('/api/author')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send(validPayload)
    
      expect(response.status).toBe(400)
      expect(response.body.error).toBe("Author ID is required")
  })
})

describe('Testing API GET on /author', () => {
  test('Not Found Author', async () => {
    const response = await request(app)
      .get('/api/author/-1')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send()
    
    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Author not found")
  })

  test('Valid author', async () => {
    const response = await request(app)
      .get('/api/author/0')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot(getByIdResponse)
  })

  test('Get All Authors', async () => {
    const response = await request(app)
      .get('/api/author')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send()

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
  })
})

describe('Testing API DELETE on /author', () => {
  test('Deleting  a non-existing author', async () => {
    const response = await request(app)
      .delete('/api/author/98765')
      .auth(process.env.JEST_USR, process.env.JEST_PASS)
      .send()

    expect(response.status).toBe(404)
  });

  test('Deleting TEST author on /author', async () => {
    const response = await request(app)
    .delete('/api/author/0')
    .auth(process.env.JEST_USR, process.env.JEST_PASS)
    .send()

   expect(response.status).toBe(204)
  })
})