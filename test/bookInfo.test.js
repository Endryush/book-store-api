import request from 'supertest';
import app from '../src/server'

const validPayload = {
  bookId: 2,
  category: "Horror",
  pages: 32,
  description: "Livro de horror medo",
  author: "Mrs. Little Little"
}

const validResponse = {...validPayload}

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
      .delete(`/api/book/info/${validPayload.bookId}`)
      .send()

    expect(response.status).toBe(204)
  })
})