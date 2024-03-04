const passport = require("passport");

router.post('/', passport.authenticate('local'));