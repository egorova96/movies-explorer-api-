const router = require('express').Router();
const celebrate = require('../middlewares/celebrates');
// eslint-disable-next-line linebreak-style

const usersRouter = require('./users');
const movieRouter = require('./movies');

const { auth } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

const { RESOURCE_ERROR } = require('../utils/constants');

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
