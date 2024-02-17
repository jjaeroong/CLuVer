const express = require('express');
const subuserlist = require('../Controllers/subclubusers');

const router = express.Router();

router.get('/getMembers/:subclubname', subuserlist.getMembers);

module.exports = router;