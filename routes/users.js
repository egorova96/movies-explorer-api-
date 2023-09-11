const router = require('express').Router();
const celebrate = require('../middlewares/celebrates');
const {
  getUserById,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', getUserById);

router.patch('/users/me', celebrate.updateUser, updateUser);

module.exports = router;
