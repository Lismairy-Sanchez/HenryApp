const mongoose = require("mongoose");

const pair_programmingSchema = new mongoose.Schema({
  _id:{
    type:String
  },
  Group: 
    {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Group'
  },
  Students: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Student'
    },
  ],
  Pm: [
    {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student'
  }],
});

const Pair_programming = mongoose.model(
  "Pair_programming",
  pair_programmingSchema
);

module.exports = Pair_programming;
