import { body } from 'express-validator'

export const testAddNewMovie = [
  body('genres').isArray({ min: 1 }),
  body('title')
    .isString()
    .isLength({ max: 255 }),
  body('year').isNumeric(),
  body('runtime').isNumeric(),
  body('director')
    .isString()
    .isLength({ max: 255 }),
  body('actors')
    .optional()
    .isString(),
  body('plot')
    .optional()
    .isString(),
  body('posterUrl')
    .optional()
    .isString(),
]
export const testGetFilteredMovies = [
  body('genres').optional().isArray(),
  body('duration').optional().isNumeric()
]
