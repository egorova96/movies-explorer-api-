/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const app = express();
const mongoose = require('mongoose');

const { PORT = 3000, DATABASE_URL } = process.env;
mongoose.connect(DATABASE_URL);

const { errors } = require('celebrate');
const routes = require('routes');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(errors());
app.use(helmet());

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.use(routes);

app.use(cors());

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
