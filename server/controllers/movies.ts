import { findMovieIndex, getMovieId, readAllContentFromFile, writeContentToFile, checkErrors } from '../helpers'
import { Request, Response } from 'express'
import { Movie } from '../types/types'
import * as _ from 'lodash'

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = (await readAllContentFromFile()).movies
    return res.status(200).send(movies)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const addNewMovie = async (req: Request, res: Response) => {
  try {
    const requestBody = req.body as Movie
    const data = await readAllContentFromFile()
    const errors = await checkErrors(req, res, data)

    if (errors) {
      return res.status(400).json(errors)
    }

    const movieExist = findMovieIndex(data.movies, requestBody.title)
    if (movieExist !== -1) {
      data.movies[movieExist] = {
        ...data.movies[movieExist],
        ...requestBody,
      }
      await writeContentToFile(data)
      return res.status(200).send({
        body: data.movies[movieExist],
        msg: 'Successfully updated movie.',
      })
    }

    const id = getMovieId(data.movies)
    const newMovie = {
      ...requestBody,
      id,
    }
    data.movies.push(newMovie)
    await writeContentToFile(data)
    res.status(200).send({
      body: newMovie,
      msg: 'Successfully added new movie.',
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getFilteredMovies = async (req: Request, res: Response) => {
  try {
    const { duration, genres } = req.body
    const data = await readAllContentFromFile()
    const movies = data.movies
    const errors = await checkErrors(req, res, data)

    if (errors) {
      return res.status(400).json(errors)
    }

    if (!duration && !genres) {
      return res.status(200).send(_.sample(movies))
    }

    if (duration > 10 && !genres) {
      const filteredMovies = _.filter(movies,
        movie => _.inRange(parseInt(movie.runtime), duration - 10, duration + 10))
      return res.status(200).send(_.sample(filteredMovies))
    }

    const filteredMovies = _.filter(movies, movie => !_.isEmpty(_.intersection(genres, movie.genres)))
    const sortedMovies = _.orderBy(_.orderBy(filteredMovies,
      [movie => _.intersection(movie.genres, genres).length],
      ['desc']),
      [item => item.genres.length],
      ['desc'])

    if (duration > 10 && genres) {
      const filteredByDurationAndGenres = _.filter(sortedMovies,
        movie => _.inRange(parseInt(movie.runtime), duration - 10, duration + 10))
      return res.status(200).send(filteredByDurationAndGenres)
    }

    return res.status(200).send(sortedMovies)
  } catch (error) {
    return res.status(500).send(error)
  }
}


export {
  getAllMovies,
  addNewMovie,
  getFilteredMovies,
}
