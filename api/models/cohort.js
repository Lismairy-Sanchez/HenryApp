const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment"); //no modificar
autoIncrement.initialize(mongoose.connection); //no modificar

const cohortSchema = new mongoose.Schema({
  code: { type: Number, default: 0, unique: true },
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: false,
  },
  graduationDay: {
    type: Date,
    required: false,
  },
});

cohortSchema.plugin(autoIncrement.plugin, {
  model: "Cohort",
  field: "code",
  startAt: 1,
  incrementBy: 1,
});

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
