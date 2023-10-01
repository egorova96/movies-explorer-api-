const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET, NODE_ENV } = process.env;

const { AUTHORIZATION } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(
      AUTHORIZATION,
    ));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    return next(new UnauthorizedError(AUTHORIZATION));
  }

  req.user = payload;

  return next();
};
