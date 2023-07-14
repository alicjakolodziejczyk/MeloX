const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');
const jwtAuth = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

//router.get('/google/callback', googleStrategy);

module.exports = router;