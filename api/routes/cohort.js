const express = require("express");
const router = express();
const ObjectId = require("mongodb").ObjectId;
const Cohort = require("../models/cohort");
const User = require("../models/user");


router.get("/all", (req, res, next) => {
  Cohort.find(function (err, cohorts) {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json(cohorts);
  });
});

router.put("/:name", async (req, res) => {
  const { name } = req.params;
  const body = req.body;

  const newCohort = await Cohort.findOneAndUpdate({ name }, body, {
    new: true,
  });
  res.status(200).json({ msg: "Ok", cohort: newCohort });
});

// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   if (id) {
//     Cohort.find({ _id: id }, (err, cohort) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       res.status(200).json({ cohorte: cohort });
//     });
//   }
// });

router.delete("/:code", (req, res) => {
  const { code } = req.params;
  Cohort.deleteOne({ code: code }, function (err, deleted) {
    if (!deleted) {
      res.status(400).json({ msg: "error" });
      return;
    } else {
      res.status(200).json({ msg: "Ok" });
    }
  });
});

router.post("/create", (req, res) => {
  const { name, startDate } = req.body;

  Cohort.create({ name: name, startDate: startDate }, function (err, cohort) {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json({ msg: "Ok", cohort: cohort });
  });
});

router.get("/students", (req, res) => {
  const { cohort } = req.query;

  User.find({ role: "student" })
    .populate("cohorte")
    .populate("group")
    .populate("module")
    .populate("clases")
    .then((students) => {
      const studentsCohort = students.filter((student) => student.cohorte);
      const response = studentsCohort.filter(
        (student) => student.cohorte.name === cohort
      );
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
