const { ERRORHANDLER_MESSAGE, SERVER_ERROR } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR
        ? ERRORHANDLER_MESSAGE
        : message,
    });

  next();
};
module.exports = errorHandler;
