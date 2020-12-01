const router = require("express").Router();
const User = require("../models/user");
const Cohort = require("../models/cohort");
const Group = require("../models/group");

/*===== Create Admin ===== */
router.post("/", async (req, res) => {
  const { name, lastName, dni, email, password } = req.body;
  if (!name && !lastName && !dni && !email && !password) {
    return res.status(400).send("Faltan parametros");
  } else {
    const dnilAdmin = await User.findOne({ dni: dni });
    if (dnilAdmin) {
      res.status(400).send("DNI existente");
    } else {
      const newAdmin = new User({ name, lastName, dni, email, password });
      newAdmin.role = "admin";
      newAdmin.password = await newAdmin.encryptPassword(password);
      await newAdmin.save();
      res.status(200).json({ msg: "OK", admin: newAdmin });
    }
  }
});

/*=====  Get all admins ===== */
router.get("/all", (req, res) => {
  User.find({ role: "admin" })
    .then((admins) => {
      res.status(200).send(admins);
    })
    .catch((err) => {
      console.log(err);
    });
});
/*===== Get all users: admin+student+instructor ===== */
router.get("/users", (req, res) => {
  User.find()
    .populate("cohorte")
    .populate("group")
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

/*===== Get OneAdmin by code ===== */
router.get("/:code", (req, res) => {
  const { code } = req.params;

  User.findOne({ code: code })
    .then((user) => {
      res.status(200).json({ msg: "OK", user });
    })
    .catch((err) => {
      console.log(err);
    });
});

/*===== Delete user by code (admin, instructor o admin)===== */
router.delete("/:code", (req, res) => {
  const { code } = req.params;

  User.deleteOne({ code: code }, function (err, deleted) {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json({ msg: "Ok" });
  });
});

/*===== Update student/instructor - Cohort ===== */
router.put("/cohort/:code/:cohort", (req, res) => {
  const { code, cohort } = req.params;

  Cohort.findOne({ name: cohort }, function (err, cohort) {
    if (err) {
      console.log(err);
      return;
    }
    User.update({ code: code }, { $set: { cohorte: cohort } }).then(() => {
      res.status(200).json({ msg: "Ok", cohort: cohort });
    });
  });
});

/* ======== Promover student - Instructor ========= */

router.put("/student/:code/instructor", (req, res) => {
  const { code } = req.params;

  User.findOneAndUpdate({ code: code }, { $set: { role: "instructor" } }).then(
    () => {
      res.status(200).json({ msg: "ok" });
    }
  );
});

/*===== Update student/instructor - group===== */
router.put("/group/:code/:group", (req, res) => {
  const { code, group } = req.params;

  //asignar grupo al estudiante
  //sumar el estudiante al array del grupo
  User.findOne({ code: code }, function (err, findStudent) {
    if (err) {
      res.status(400);
      return;
    }
    Group.findOneAndUpdate(
      { name: group },
      { $push: { students: findStudent } },
      { new: true }
    ).then(() => {
      Group.findOne({ name: group }, function (err, group) {
        if (err) {
          res.status(400);
          return;
        }
        User.findOneAndUpdate(
          { code: code },
          { $set: { group: group } },
          { new: true }
        ).then(() => {
          res.status(200).json({ msg: "Ok" });
        });
      });
    });
  });
});

module.exports = router;
