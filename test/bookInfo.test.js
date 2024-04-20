import request from 'supertest';
import app from '../src/server'

const validPayload = {
  bookId: 2,
  category: "Horror",
  pages: 32,
  description: "Livro de horror medo",
  author: "Mrs. Little Little"
}

const validResponse = {
 ...validPayload,
}

const validReview = {
  title: "teste",
  client: "client test",
  rating: 4,
  description: "Legal"
 }

describe('Testing APi POST on /book/info', () => {
  test('Must return error 400 on trying to POST an invalid info', async () => {
    const response = await request(app)
      .post('/api/book/info')
      .send({bookId: -1})

    expect(response.status).toBe(400)
  })
  test('Should return a created book with status code 201 on sending a valid payload', async () => {
    const response = await request(app)
      .post('/api/book/info')
      .send(validPayload)
  
    expect(response.status).toBe(201)
  })
})

describe('Testing API PUT on /book/info', () => {
  test('Must return error 400 on trying to PUT an invalid info', async () => {
    const response = await request(app)
      .put('/api/book/info')
      .send({bookId: -1})

    expect(response.status).toBe(400)
  })
  test('Should return an updated book with status code 200 on sending a valid payload', async () => {
    const response = await request(app)
      .put('/api/book/info')
      .send(validPayload)
  
    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot(validResponse)
  })
  test('Should return error 404 for invalid bookId', async () => {
    const invalidPayload = {...validPayload}
    invalidPayload.bookId = -1
    const response = await request(app)
      .put('/api/book/info')
      .send(invalidPayload)

    expect(response.status).toBe(404)
    expect(response.body.error).toBeTruthy()
  })
})

describe('GET BOOKINFO on book/info', () => {
  test('GET ALL BOOKINFO on book/info/all', async () => {
    const response = await request(app)
      .get('/api/book/info/all')
      .send()

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
  })

  test('GET BOOKINFO by ID on book/info/:id', async () => {
    const response = await request(app)
      .get('/api/book/info/2')
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toMatchSnapshot(validResponse)
  })

  test('GET BOOKINFO by an invalid ID on book/info/:id', async () => {
    const response = await request(app)
      .get('/api/book/info/-1')
      .send()

    expect(response.status).toBe(404)
    expect(response.body.error).toBeTruthy()
  })
})

describe('Testing API Review on /book/:id/review', () => {
  test('create a review with invalid params', async () => {
    const response = await request(app)
      .post('/api/book/2/review')
      .send({})
    
    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
  })
  test('create a valid review', async () => {
    const response = await request(app)
      .post('/api/book/2/review')
      .send(validReview)
    
    expect(response.status).toBe(201)
  })
})


describe('Testing API DELETE on /book/info', () => {
  test('Deleting  a non-existing book/info', async () => {
    const response = await request(app)
      .delete('/api/book/info/-1')
      .send()

    expect(response.status).toBe(404)
  });

  test('Deleting with an invalid parameter', async () => {
    const response = await request(app)
      .delete('/api/book/info/hshshs')
      .send()

    expect(response.status).toBe(400)
    expect(response.body.error).toBeTruthy()
  })

  test('Deleting TEST book on /book/info', async () => {
    const response = await request(app)
      .delete('/api/book/info/2')
      .send()

    expect(response.status).toBe(204)
  })
})