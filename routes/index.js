const express = require('express');

const router = express.Router();
const {
  homeController,
  signin,
  signup,
  createUser,
  loginUser,
} = require('../controllers/homeController');

router.route('/').get(homeController);

router.route('/register').get(signup).post(createUser);

router.route('/login').get(signin).post(loginUser);

router.use('/user', require('./user'));

module.exports = router;
