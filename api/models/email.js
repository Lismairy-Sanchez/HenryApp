const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
