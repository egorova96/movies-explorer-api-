/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const { INCORRECT_URL } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: INCORRECT_URL,
    },
    type: String,
  },
  trailerLink: {
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: INCORRECT_URL,
    },
    type: String,
  },
  thumbnail: {
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: INCORRECT_URL,
    },
    type: String,
  },
  owner: {
    ref: 'user',
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
}, { versionKey: false });
module.exports = mongoose.model('movie', movieSchema);
