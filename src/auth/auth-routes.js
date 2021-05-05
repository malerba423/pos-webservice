const express = require('express');
const router = express.Router();
const authController = require('./auth-controller');
const { requireAuth } = require('./auth-middleware');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/check-auth', requireAuth, authController.checkAuth);

module.exports = router;
