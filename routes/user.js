const express = require('express');
const router = express.Router();

const { dashboardController } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.route('/dashboard').get(authMiddleware, dashboardController);

module.exports = router;
