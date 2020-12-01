const express = require("express");
const router = express();

const User = require("../models/user");
const Feedback = require("../models/feedback");

router.get("/all", (req, res) => {
    Feedback.find(function (err, feedback) {
        if (err) {
            console.log(err);
            return;
        }
    })
        .populate("students")
        .then((feedback) => {
            res.status(200).json({ msg: "Ok", feedback });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/create", (req, res) => {
    const { idStudent, comment, qualification } = req.body
    Feedback.create({
        idStudent,
        comment,
        qualification
    }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.status(200).json({ msg: "Ok", data });
    });
})

//obtener promedio de feedback por alumno

router.get("/prom/:id", async (req, res) => {
    const id = req.params.id
    var sum = 0;
    var div = 0;
    var prom = 0;
    try {
        const feeds = await Feedback.find({ idStudent: id });
        feeds.forEach(e => {
            sum += e.qualification;
            div++;
        })
        prom = sum / div;
        var resultado = (Math.ceil(prom) + Math.floor(prom)) / 2;
        res.status(200).json({ msg: "ök", resultado });
        return;
    }
    catch {
        err => {
            console.log(err)
        }
    }
})

module.exports = router;