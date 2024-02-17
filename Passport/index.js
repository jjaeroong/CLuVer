const passport = require('passport');
const local = require('./strategies/local');
passport.use(local);