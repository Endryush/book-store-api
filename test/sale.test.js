import request from 'supertest';
import app from '../src/server'
const date = "2024-04-20T14:50:11.801Z"

const validPayload = {
  date: date,
  value: 40.5,
  clientId: 2,
  id: 0,
  bookId: 2,
  authorId: 2
}

const getByIdResponse = {
  date: date,
  value: 40.5,
  clientId: 2,
  id: 0,
  bookId: 2
}

describe('Testing API POST on /sale', () => {
  test('invalid Payload', async () => {
    const response = await request(app)
      .post('/api/sale')
      .send({})

      expect(response.status).toBe(400)
  })

  test('Without clientId POST on  /sale', async () => {
    const payload = {...validPayload}
    delete payload.clientId
    const response = await request(app)
      .post('/api/sale')
      .send(payload)

      expect(response.status).toBe(400)
      expect(response.body.error).not.toBeUndefined()
  })

  test ('validPayload', async () => {
    const response = await request(app)
      .post('/api/sale')
      .send(validPayload)

    expect(response.status).toBe(201)
  })
})

describe ('Testing  PUT /sale', () => {
  test('Valid Sale', async () => {
    const payload = {
      ...validPayload
    }
    payload.id = '0'
    const response = await request(app)
      .put('/api/sale')
      .send(payload)

    expect(response.status).toBe(200)
  })

  test('NotFoundSale', async () => {
    const payload = {
      ...validPayload
    }
    payload.id = -1
    const response = await request(app)
      .put( '/api/sale')
      .send(payload)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Sale not Found")
  })

  test('With No Id Informed', async () => {
    const payload = { ...validPayload }
    delete payload.id

    const response = await request(app)
      .put('/api/sale')
      .send(validPayload)
    
      expect(response.status).toBe(400)
      expect(response.body.error).toBe("Sale ID is required")
  })

  test('Without clientId PUT on  /sale', async () => {
    const payload = {...validPayload}
    delete payload.clientId
    const response = await request(app)
      .post('/api/sale')
      .send(payload)

      expect(response.status).toBe(400)
      expect(response.body.error).not.toBeUndefined()
  })
})

describe('Testing API GET on /sale', () => {
  test('Not Found Sale', async () => {
    const response = await request(app)
      .get('/api/sale/-1')
      .send()
    
    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Sale not found")
  })

  test('Valid sale', async () => {
    const response = await request(app)
      .get('/api/sale/0')
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot(getByIdResponse)
  })

  test('Get All Sales', async () => {
    const response = await request(app)
      .get('/api/sale')
      .send()

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
  })
})

describe('Testing API GET on /sale with query Params', () => {
  test ('Should return Sales by authorId', async () => {
    await testGetSalesByParameter('authorId')
  })
  test ('Should return Sales by clientId', async () => {
    await testGetSalesByParameter('clientId')
  })
  test ('Should return Sales by bookId', async () => {
    await testGetSalesByParameter('bookId')
  })
  test ('Should return Sales by invalid Param and return all results', async () => {
    await testGetSalesByParameter('d')
  })
  test ('Should return Sales by invalid Param value return 404', async () => {
    const response = await request(app)
    .get('/api/sale?authorId=-1')
    .send();

    expect(response.status).toBe(404);
  })
})

describe('Testing API DELETE on /sale', () => {
  test('Deleting  a non-existing sale', async () => {
    const response = await request(app)
      .delete('/api/sale/98765')
      .send()

    expect(response.status).toBe(404)
  });

  test('Deleting TEST sale on /sale', async () => {
    const response = await request(app)
    .delete('/api/sale/0')
    .send()

   expect(response.status).toBe(204)
  })
})

async function testGetSalesByParameter (param) {
  const response = await request(app)
    .get(`/api/sale?${param}=2`)
    .send();

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
}