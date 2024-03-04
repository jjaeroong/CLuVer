const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// 사용자의 비밀번호를 확인하는 라우트
router.post('/check-password', userController.checkPassword);

module.exports = router;