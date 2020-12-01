const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  students: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],

  cohorte: {
    type: Schema.Types.ObjectId,
    ref: "Cohort",
  },

  checkpoint: {
    type: String,
  },

  means: [{
    type: String,
  }],
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
