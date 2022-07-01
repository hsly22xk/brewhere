const express = require('express');
const router = express.Router();

const emailCheckController = require('../controllers/mypage/emailCheck');
const usernameController = require('../controllers/mypage/username');
const passwordController = require('../controllers/mypage/password');
const withdrawalController = require('../controllers/mypage/withdrawal');

router.post('/email', emailCheckController);
router.patch('/username', usernameController);
router.patch('/password', passwordController);
router.delete('/withdrawal', withdrawalController);

module.exports = router;
