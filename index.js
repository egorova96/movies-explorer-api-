const router = require('express').Router();
const celebrate = require('./middlewares/celebrates');

const usersRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const { auth } = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

const { RESOURCE_ERROR } = require('./utils/constants');

router.post('/signup', celebrate.createUser, createUser);

router.post('/signin', celebrate.login, login);

router.use(auth);
router.use(usersRouter);
router.use(movieRouter);

// eslint-disable-next-line arrow-body-style
router.use('*', (req, res, next) => {
  return next(new NotFoundError(RESOURCE_ERROR));
});

module.exports = router;
