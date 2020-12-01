const router = require("express").Router();
const Calendar = require ("../models/calendario");

router.get("/all", async (req, res) => {
    Calendar.find(function (err, calendar) {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200).send(calendar);
      });
    });


router.post("/create", async (req, res) => {
    const {title, year, month, day, hour, minute, endYear, 
      endMonth, endDay, endHour, endMinute, allDay} = req.body;
    if (!title || !year || !month || !day || !hour || !endYear || 
      !endMonth || !endDay || !endHour || !endMinute || allDay===undefined) {
        return res.status(400).send("Faltan parametros")
    } Calendar.create({ title: title, year: year, month:month, day:day, 
      hour:hour, minute:minute, endYear:endYear, 
      endMonth:endMonth, endDay:endDay, endHour:endHour, endMinute:endMinute, allDay:allDay }, function (err, calendar) {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200).json({ msg: "Ok", calendar });
      })
    })

    router.get("/:id", async (req, res) => {
        const id= req.params.id
        Calendar.findOne({ _id: id })
        .then((event) => {
          res.status(200).json({ msg: "OK", event });
        })
        .catch((err) => {
          console.log(err);
        });
    });

    router.delete("/delete", async (req, res) => {
        const {title} = req.body
        Calendar.deleteOne({ title: title }, function(err, deleted){
            if(err) {
              console.log(err);
              return     
            }
            res.status(200).json({msg: "Ok"})
          });
        });
    

    module.exports=router
    