const router = require("express").Router();
const passport = require("passport");
const checkAuthentication = require("../helpers/verifySession");
const User = require("../models/user");
const Cohort = require("../models/cohort");
const ObjectId = require("mongodb").ObjectId;
//----------Logueo-------------
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err) {
      res.status(500).json({ message: "error" });
      return;
    }
    if (!user) {
      res.status(401).json({ message: "user" });
      return;
    }
    req.login(user, (error) => {
      if (error) {
        res.status(500).json({ message: "no guardado" });
        return;
      }
      res.status(200).json({ errors: false, user: user });
    });
  })(req, res, next);
});

router.get("/", checkAuthentication, async (req, res) => {
  await Cohort.find({ _id: req.user.cohorte }, (err, cohort) => {
    if (err) {
      console.log(err);
    }
    req.user.cohorte = cohort[0];
    res.status(200).json(req.user);
  });
});
//--------- Autenticación Google -----------

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/alumnos",
    session: true,
  })
);

//--------- Autenticación Github -----------
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:3000/alumnos",
    session: true,
  })
);

router.post("/logout", (req, res) => {
  req.logout();

  res.sendStatus(200);
});

module.exports = router;
