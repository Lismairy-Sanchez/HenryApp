const express = require("express");
const router = express();
const User = require("../models/user");
const Cohort = require("../models/cohort");

/*====  Post instructor ====== */
router.post("/", async (req, res) => {
  const { name, lastName, dni, email, password, cohorte } = req.body;
  if (!name && !lastName && !dni && !email && !password && !cohorte) {
    return res.status(400).send("Faltan parametros");
  } else {
    const dniInstructor = await User.findOne({ dni: dni });
    if (dniInstructor) {
      res.status(400).send("Email existente");
    } else {
      const newInstructor = new User({
        name,
        lastName,
        dni,
        email,
        password,
      });
      newInstructor.password = await newInstructor.encryptPassword(password);
      newInstructor.role = "instructor";
      await newInstructor.save();
      res.status(200).json({ msg: "OK", admin: newInstructor });
    }
  }
});

/*==== Get all instructors ==== */
router.get("/all", (req, res) => {
  User.find({ role: "instructor" })
    .populate("cohorte")
    .then((instructor) => {
      res.status(200).send(instructor);
    })
    .catch((err) => {
      console.log(err);
    });
});

/*===== Edit Instructor data =====*/
router.put("/:code", (req, res) => {
  const { code } = req.params;
  const { name, lastName, dni, email } = req.body;
  User.findOneAndUpdate(
    { code: code },
    {
      name: name,
      lastName: lastName,
      email: email,
      dni: dni,
    }
  ).then(() => {
    res.status(200).json({ msg: "Ok" });
  });
});

module.exports = router;
