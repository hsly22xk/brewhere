const express = require('express');
const router = express.Router();

let signupController = require('../controllers/users/signup');
let authController = require('../controllers/auth');
let loginController = require('../controllers/users/login');
let logoutController = require('../controllers/users/logout');

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.get('/auth', authController);

module.exports = router;
