import bodyParser from 'body-parser'
import app from '../app'
import { Movie, Error } from '../types/types'


app.use(bodyParser.json())
const supertest = require('supertest')
const request = supertest(app)

describe('API', () => {
  it('should get OK message', async () => {
    const status: number = (await request.get('/')).status
    expect(status).toBe(200)
  })
  it('should not add the movie', async () => {
    const response = await request
      .post('/api/movies/add')
      .type('form')
      .send({
        title: 'Fail test title',
        year: 1992,
        genres: ['Comedy', 'Drama'],
        runtime: 'Should be a number',
      })
    const { body, status }: {
      body: {
        errors: Error[]
      },
      status: number
    } = response
    expect(status).toBe(400)
    expect(body.errors[0].param).toBe('runtime')
    expect(body.errors[0].value).toBe('Should be a number')
  })
  it('should add the movie', async () => {
    const movie = {
      title: 'Pass test title',
      year: 1992,
      genres: ['Comedy', 'Drama'],
      director: 'Andrzej',
      runtime: 120,
    }
    const response = await request
      .post('/api/movies/add')
      .type('form')
      .send(movie)
    const { body, status }: {
      body: {
        body: Movie
        msg: string
      },
      status: number
    } = response
    expect(status).toBe(200)
    expect(body.msg).toBe('Successfully updated movie.')
  })
  it('should return single random movie', async () => {
    const response = await request.get('/api/moviesByParams')
    const { status, body } = response
    expect(status).toBe(200)
    expect(Boolean(body['title']) &&
      Boolean(body['year']) &&
      Boolean(body['runtime']) &&
      Boolean(body['genres'] &&
      Boolean(body['director'])))
      .toBe(true)
  })
})
