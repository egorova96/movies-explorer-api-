const { SERVER_NOT_WORKING } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_NOT_WORKING
        : message,
    });

  next();
};

module.exports = errorHandler;
