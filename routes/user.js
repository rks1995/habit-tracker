const express = require('express');
const router = express.Router();

const {
  dashboardController,
  logout,
  changeView,
  addHabbit,
  updateHabbitStatus,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const destroyTokken = require('../middleware/destroyToken');

router.route('/dashboard').get(authMiddleware, dashboardController);
router.route('/toggleStatus').get(updateHabbitStatus);
router.route('/update-view').get(changeView);
router.route('/create-habbit').post(authMiddleware, addHabbit);
router.route('/sign-out').get(destroyTokken, logout);
module.exports = router;
