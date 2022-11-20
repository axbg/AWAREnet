const passport = require('koa-passport');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//
// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_SECRET,
//   callbackURL: '/api/user/login/google/callback/',
// }, callbackHandler));
//
// passport.use(new FacebookStrategy({
//   clientID: FACEBOOK_CLIENT_ID,
//   clientSecret: FACEBOOK_SECRET,
//   callbackURL: '/api/user/login/facebook/callback/',
//   profileFields: ['email', 'name'],
// }, callbackHandler));

module.exports = passport;
