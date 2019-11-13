const router = require('express').Router();
const passport = require('passport');


//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

module.exports = router;