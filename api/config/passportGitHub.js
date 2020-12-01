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
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOrCreate({
          where: { githubId: profile.id },
          defaults: {
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : null,
          },
        });

        if (!user)
          return done(null, false, {
            message: "No pudimos loguearte con esa cuenta",
          });
        return done(null, user);
      } catch (error) {
        done(error);
      }
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
