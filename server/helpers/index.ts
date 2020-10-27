import fs from 'fs'
import { Movie } from '../types/types'
import * as _ from 'lodash'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const readAllContentFromFile = async () => {
  return new Promise<{ genres: string[]; movies: Movie[] }>((resolve, reject) => {
    fs.readFile('server/data/db.json', 'utf8', (err, data) => {
      if (err) reject(err)
      try {
        resolve(JSON.parse(data))
      } catch (error) {
        reject(error)
      }
    })
  })
}

export const getMovieId = (movies: Movie[]) => {
  return _.maxBy(movies, 'id')!.id + 1
}

export const findMovieIndex = (movies: Movie[], title: string) => {
  return _.findIndex(movies, movie => movie.title === title)
}

export const writeContentToFile = async (jsonData: { genres: string[]; movies: Movie[] }) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('server/data/db.json', JSON.stringify(jsonData, null, 4), err => {
      if (err) reject(err)
      resolve()
    })
  })
}

export const checkErrors = async(req: Request, res: Response, data: {genres: string[]; movies: Movie[]}) => {
  const errors = validationResult(req)
  if (!_.isEmpty(errors.array())) {
    return { errors: errors.array() }
  }
  const requestBody = req.body as Movie
  const incorrectGenres = _.filter(requestBody?.genres, genre => !data.genres.includes(genre))
  if (!_.isEmpty(incorrectGenres)) {
    return {
      errors: [{
        msg: `Genre does't belong to the list. Incorrect genre: ${incorrectGenres}`,
        param: 'genres',
        location: 'body',
      }],
    }
  }
}
