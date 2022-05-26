const express = require('express');
const router = express.Router();

const {
  dashboardController,
  logout,
  changeView,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const destroyTokken = require('../middleware/destroyToken');

router.route('/dashboard').get(authMiddleware, dashboardController);
router.route('/update-view').get(changeView);
router.route('/sign-out').get(destroyTokken, logout);
module.exports = router;
