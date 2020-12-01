const express = require("express");
const router = express();

//---Modelos----
const User = require("../models/user");
const Cohort = require("../models/cohort");
const Module = require("../models/module");

//ruta para crear modulo

router.post("/create", (req, res) => {
    const newModule = req.body;
    Module.create(newModule, function (err, newModule) {
        if (err) {
            console.log(err);
            return;
        }
        res.status(200).json({ msg: "Ok", newModule });
    });
});

//ruta para obtener los modulos

router.get("/all", (req, res) => {
    Module.find(function (err, modules) {
        if (err) {
            console.log(err);
            return;
        }
    })
        .populate("students")
        .populate("cohorte")
        .then((modules) => {
            res.status(200).json({ msg: "Ok", modules })
        })
        .catch(err => {
            console.log(err.message)
        })
})

//ruta para obtener un _id de  modulo por su nombre

router.get("/:nombre", async (req, res) => {
    const nombre = req.params.nombre;
    try {
        var module = await Module.findOne({ name: nombre })
        res.status(200).json({ id: module._id })
    }
    catch {
        console.log("algo salio mal")
    }
})


//ruta para asignar el modulo a los alumnos

router.put("/asignate", (req, res) => {
    var { _id, students } = req.body;
    if (_id === "") { return }
    students.forEach(e => {
        User.findOneAndUpdate({ code: e.code }, { module: _id })
            .then(res => {

            })
            .catch(err => {
                console.log(err.message)
            })
    })
    return res.status(200).json({ msg: `se actualizaron los alumnos` })

})

//ruta para obtener los recursos de un modulo por su id

router.get("/means/:id", async (req, res) => {
    var { id } = req.params;
    try {
        const module = await Module.findOne({ _id: id })
        return res.status(200).json({ means: module.means })
    }
    catch { err => console.log(err.message) }

})

// ruta para modificar un modulo

router.put("/:name", (req, res) => {
    const name = req.params.name;
    const body = req.body;
    Module.update({ name }, body)
        .then(data => {
            res.status(200).json({ msg: "Ok", data })
        })
        .catch(err => {
            console.log(err.message)
        })
})

// ruta para borrar modulo

router.delete("/:name", (req, res) => {
    const name = req.params.name;
    Module.deleteOne({ name: name }, function (err, data) {
        if (data.deletedCount === 0) {
            res.status(400).json({ msg: "error" })
            return;
        }
        else {
            res.status(200).json({ msg: "Ok" })
        }
    })

})

module.exports = router;