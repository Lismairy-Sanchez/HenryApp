const express = require("express");
const router = express();

const Group = require("../models/group");
const User = require("../models/user");
const Cohort = require("../models/cohort");

router.get("/all", (req, res) => {
	Group.find(function (err, groups) {
		if (err) {
			console.log(err);
			return;
		}
	})
		.populate("pms")
		.populate("students")
		.populate("cohort")
		.then((groups) => {
			res.status(200).json({ msg: "Ok", groups });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/:name", (req, res) => {
	const { name } = req.params;

	Group.find({ name }, function (err, groups) {
		if (err) {
			console.log(err);
			return;
		}
	})
		.populate("Pms")
		.populate("students")
		.then((groups) => {
			res.status(200).json({ msg: "Ok", groups });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/create", (req, res) => {
	const newGroup = req.body;

	Group.create(newGroup, function (err, newGroup) {
		if (err) {
			console.log(err);
			return;
		}
		res.status(200).json({ msg: "Ok", newGroup });
	});
});

//------ Asignar PM al grupo
//---- tambien pone el atributo isPM del estudiante en true

router.put("/:group/pm/:pm", (req, res) => {
  const { group, pm } = req.params; 

  User.findOneAndUpdate(
    { name: pm }, 
    { $set: { isPM: true}}, 
    { new: true })
      .then((student) => {  
        if(!student){
          res.status(400).json({msg: "Not Found"})
          return
        }        
        Group.updateOne(
          { name: group }, 
					{ $push: { pms: student } 
					})
            .then(() => {
              res.status(200).json({ msg: "Ok" });
            })
            .catch((err) => {
              console.log(err);
            });
      })
      .catch((err) => {
        console.log(err);  
      })
});

router.delete("/:group", (req, res) => {
  const { group } = req.params;

  Group.deleteOne({ name: group }, function(err, deleted){
    if(err) {
      console.log(err);
      return     
    }
    res.status(200).json({msg: "Ok"})
  });
});

//ruta para eliminar pms
router.put("/pm/clean/:group", (req, res) => {
	const { group } = req.params;

	Group.findOneAndUpdate(
		{ name: group}, 
		{ $set: { pms: [] }}
		)
		.then((group) => {
			group.pms.forEach(pm => {	
				User.findByIdAndUpdate(
					pm, 
					{ $set: { isPM: false }},
					{new: true}
				)
				.then((r) => {					
				 	console.log(r);				 
				})
			});
		})
		.then(() => {
			res.status(200).json({ msg: "Ok" });
		})
		.catch((err) => {
			console.log(err);			
		})
})

//ruta para asignar cohorte

router.put("/cohort/:group/:cohort", (req, res) => {
	const {group, cohort} = req.params;

	Cohort.findOne({ name: cohort }, function(err, cohort){
		if(err){
			console.log(err);
			res.status(400)
			return;
		}
		Group.findOneAndUpdate(
			{ name: group}, 
			{ $set: { cohort: cohort }}
		)
			.then((r) => {
				res.status(200).json({msg:"Ok"})
			})
	})
})

//ruta para asignar estudiantes en bulk
module.exports = router;
