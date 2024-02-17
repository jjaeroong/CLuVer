const express = require('express');
const router = express.Router();
const clubController = require('../Controllers/club');

router.get('/', clubController.getAllClubs);

router.get('/:clubId/members', clubController.getMembersByClubId);

router.get('/user/clubs', clubController.getUserClubs);


module.exports = router;
