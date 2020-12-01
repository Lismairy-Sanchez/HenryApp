require("dotenv").config();

const express = require("express");
const router = express();
const Email = require("../models/email");
const { MAIL_GUN_KEY, MAIL_GUN_DOMAIN } = process.env;

var mailgun = require("mailgun-js")({
  apiKey: MAIL_GUN_KEY,
  domain: MAIL_GUN_DOMAIN,
});
//--------------Post------------------------
router.post("/create", (req, res) => {
  console.log(process.env.MAIL_GUN_KEY);

  const newEmail = req.body;
  console.log(newEmail);
  const data = {
    from: "HenryApp <henry.appgraduados@gmail.com>",
    to: newEmail.email,
    subject: "Bienvenido a Henry",
    text: "Ingresa al campus virtual",
    template: "invitacion.test",
  };

  if (!newEmail) {
    return res.status(400).json({
      message: "Falta email",
    });
  } else {
    Email.create(newEmail, function (err, newEmail) {
      if (err) {
        console.log(err);
        return;
      }
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
      res.status(200).json(newEmail);
    });
  }
});

//---------------Get----------------

router.get("/all", (req, res, next) => {
  Email.find(function (err, emails) {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json(emails);
  });
});

//---------------Put----------------
router.put("/:email", (req, res) => {
  const email = req.body;

  Email.update(email)
    .then(() => {
      res.status(200).json({ msg: "Ok" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//---------------Delete-----------------
router.delete("/:email", (req, res) => {
  const { email } = req.params;

  Email.deleteOne({ email: email }, function (err, deleted) {
    if (deleted.deletedCount === 0) {
      res.status(400).json({ msg: "error" })
      return;
    }
    else {
      res.status(200).json({ msg: "Ok" });
    }
  });
});

module.exports = router;
