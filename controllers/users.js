/* eslint-disable no-shadow */
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

const {
  OK,
  INCORRECT_DATA_ERROR,
  USER_EMAIL_EXIST,
  NOTFOUND_USER,
} = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    if (!user) {
      throw new NotFoundError(NOTFOUND_USER);
    }
    res.send(user);
  })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User
    .findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOTFOUND_USER);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(INCORRECT_DATA_ERROR));
      }
      return next(err);
    });

  module.exports.createUser = (req, res, next) => {
    const {
      name,
      email,
      password,
    } = req.body;
    bcrypt.hash(password, 10)
      .then((hash) => User.create(
        {
          name, email, password: hash,
        },
      )).then((user) => {
        res
          .status(OK)
          .send({
            data: {
              name: user.name,
              email: user.email,
              _id: user._id,
            },
          });
      }).catch((err) => {
        if (err.name === 'ValidationError') {
          return next(new ValidationError(INCORRECT_DATA_ERROR));
        }
        if (err.code === 11000) {
          return next(new ConflictError(USER_EMAIL_EXIST));
        }
        return next(err);
      });
  };
};
