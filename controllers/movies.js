/* eslint-disable linebreak-style */
const Movie = require('../models/movieSchema');
const {
  OK,
  STATUS_CODE,
  INCORRECT_DATA_ERROR,
  ACCESS_DENIED,
  NOTFOUND_MOVIE,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMyMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration,
    year, description, image,
    trailerLink, thumbnail, movieId,
    nameRU, nameEN,
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
    .then((movie) => res.status(OK).send(movie))
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

  Movie.findById(_id).then((item) => {
    if (!item) {
      throw new NotFoundError(NOTFOUND_MOVIE);
    }
    if (item.owner.toString() !== req.user._id) {
      throw new ForbiddenError(ACCESS_DENIED);
    }
    Movie
      .findByIdAndRemove(_id)
      // eslint-disable-next-line no-shadow
      .then((item) => {
        if (!item) {
          throw new NotFoundError(NOTFOUND_MOVIE);
        }
        res.status(STATUS_CODE).send(item);
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
