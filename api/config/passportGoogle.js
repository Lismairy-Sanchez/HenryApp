require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { googleClientID, googleClientSecret } = process.env;
const User = require("../models/user");

//----------------------------------PASSPORT GOOGLE-STRATEGY---------------------------------------

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: {
            name: profile.displayName,
            email: profile.emails[0].value,
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
