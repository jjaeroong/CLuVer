const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club');

router.get('/', clubController.getAllClubs);

router.get('/:clubId/members', clubController.getMembersByClubId);

router.get('/user/clubs', clubController.getUserClubs);

router.post('/:clubId/members/:memberId/assign-leader', clubController.assignLeader);

module.exports = router;
