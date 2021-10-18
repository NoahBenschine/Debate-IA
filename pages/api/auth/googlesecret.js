// require('dotenv').config();
// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//
// // Use the GoogleStrategy within Passport.
// //   Strategies in Passport require a `verify` function, which accept
// //   credentials (in this case, an accessToken, refreshToken, and Google
// //   profile), and invoke a callback with a user object.
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/debate",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, done) {
//        User.findOrCreate({ googleId: profile.id }, function (err, user) {
//          return done(err, user);
//        });
//   }
// ));
// export default function Auth(req, res) {
//
//
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
//
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function(req, res) {
//       res.redirect('/');
//     });
//   }
// }
