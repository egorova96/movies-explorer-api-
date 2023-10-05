/* eslint-disable consistent-return */
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  OK,
  INCORRECT_DATA_ERROR,
  USER_EMAIL_EXIST,
  NOTFOUND_USER,
} = require('../utils/constants');

const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

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

  User
    .findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOTFOUND_USER);
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, email, password: hash,
      },
    ))
    .then((user) => {
      res
        .status(OK)
        .send({
          data: {
            name: user.name,
            email: user.email,
            _id: user._id,
          },
        });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(INCORRECT_DATA_ERROR));
      }
      if (err.code === 11000) {
        return next(new ConflictError(USER_EMAIL_EXIST));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User
    .findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOTFOUND_USER);
      }
      res.send(user);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(INCORRECT_DATA_ERROR));
      }
      return next(err);
    });
};
