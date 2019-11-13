const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: '55573344099-0ohvvbarf8nnmle2f8868a4vch2okprq.apps.googleusercontent.com',
        clientSecret: 'gSakk7geN7iRLJJXcCr7AEnv'

}, function(){

})
)

module.exports = passport;
