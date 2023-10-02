const router = require('express').Router();
const celebrate = require('../middlewares/celebrates');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate.createMovie, createMovie);

router.delete('/movies/:_id', celebrate.deleteMovie, deleteMovie);

module.exports = router;
