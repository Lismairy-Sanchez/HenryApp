const express = require('express');
const router = express();

const Pair_programming = require('../models/pair-programming');

router.get('/all', (req, res) => {
    Pair_programming.find(function(err, PP){
      if(err) {
        console.log(err);
        return;      
      }
      res.send(PP)
    })
  });

  router.get("/", (req, res) => {
	const _id = req.body.id;

	Pair_programming.findOne({ _id: _id })
        .populate("Students")
        .populate("Pm")
		.then((PP) => {
			res.send(PP)
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post('/create', (req, res)=>{
    const newPP = req.body
    Pair_programming.create(newPP, function(err, newCohort){
        if(err) {
          console.log(err);
          return  
        }
        res.send(newCohort)
    })
})

router.put('/:id', (req, res) => {
    const  _id  = req.params.id;
    const {students, pm} = req.body;
  
    Pair_programming.update({_id}, {Students:students, Pm:pm})
      .then(() => {
        res.status(200).json({msg: 'Ok'})
      })
      .catch((err) => {
        console.log(err);  
      })
  })

router.delete("/:id", (req, res) => {
	const _id = req.params.id;

	Pair_programming.deleteOne({ _id: _id }, function (err, deleted) {
		if (err) {
			console.log(err);
			return;
		}
		res.status(200).json({ msg: "Ok" });
	});
});

module.exports=router

