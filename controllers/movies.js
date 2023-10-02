const Movie = require('../models/movies');
const {
  STATUS_OK,
  STATUS_CODE,
  INCORRECT_DATA_ERROR,
  MOVIES_NOT_FOUND,
  NO_ACCESS_RIGHTS,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: _id,
    })
    .then((movie) => res.status(STATUS_OK).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(INCORRECT_DATA_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie
    .findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIES_NOT_FOUND);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(NO_ACCESS_RIGHTS);
      }
      Movie
        .findByIdAndRemove(_id)
        // eslint-disable-next-line no-shadow
        .then((movie) => {
          if (!movie) {
            throw new NotFoundError(MOVIES_NOT_FOUND);
          }
          res.status(STATUS_CODE).send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(INCORRECT_DATA_ERROR));
      }
      return next(err);
    });
};
