import express from 'express'
import { getAllMovies, addNewMovie, getFilteredMovies } from '../controllers/movies'
import { testAddNewMovie, testGetFilteredMovies } from '../helpers/validate'

const router = express.Router()

router.get('/', (req, res) => res.send('OK'))

router.get('/api/movies', getAllMovies)
router.get('/api/moviesByParams', testGetFilteredMovies, getFilteredMovies)
router.post('/api/movies/add', testAddNewMovie, addNewMovie)

export default router
