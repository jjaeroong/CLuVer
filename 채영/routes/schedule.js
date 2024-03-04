const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule');

// GET /schedule/:year/:month/:day 라우트에 대한 처리
router.get('/:year/:month/:day', scheduleController.getScheduleByDate);

module.exports = router;
