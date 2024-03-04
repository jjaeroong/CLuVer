const express = require('express');
const subuserlist = require('../Controllers/subclubusers');

const router = express.Router();

router.get('/:id', subuserlist.getUserGroupMembers);

module.exports = router;