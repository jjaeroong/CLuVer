const express = require('express');
const router = express.Router();
const Scheduleregister = require('../Controllers/scheduleregister');

router.get('/post', Scheduleregister.getAllclubinfo);
router.get('/view', Scheduleregister.getclubinfo);
router.post('/', Scheduleregister.createSchedule);


module.exports = router;