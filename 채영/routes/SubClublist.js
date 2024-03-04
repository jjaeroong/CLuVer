const express = require('express');
const router = express.Router();
const Subclublist = require('../Controllers/subclub');


router.get('/:id', Subclublist.getUserSubclubs);



module.exports = router;