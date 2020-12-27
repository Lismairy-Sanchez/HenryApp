require("dotenv").config();
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { githubClientID, githubClientSecret } = process.env;
const User = require("../models/user");

passport.use(
  new GitHubStrategy(
    {
      clientID: githubClientID,
      clientSecret: githubClientSecret,
      callbackURL: "http://localhost:3001/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        {
          githubId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        },
        function (err, user) {
          return done(err, user);
        }
      );
    }
  )
);
//---------Passport Serializer
passport.serializeUser((user, done) => done(null, user.id));

//---------Passport Deserializer
passport.deserializeUser(function (id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
