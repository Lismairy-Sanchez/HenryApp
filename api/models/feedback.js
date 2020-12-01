const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
  idStudent: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
  comment: {
    type: String,
    required: true,
  },
  qualification: {
    type: Number,
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
