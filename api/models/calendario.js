const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection)

const calendarSchema = new mongoose.Schema({
    _id: { 
        type: Number, 
        default: 0, 
        unique: true 
    },
	title: { 
    type: String, 
    required: true 
  },
  year: {
    type: Number, 
    required: true
  },
  month: {
    type: Number, 
    required: true
  },
  day: {
    type: Number, 
    required: true
  },
  hour: {
    type: Number, 
    required: true
  },
  minute: {
    type: Number, 
    required: true
  },
  endYear: {
    type: Number, 
    required: true
  },
  endMonth: {
    type: Number, 
    required: true
  },
  endDay: {
    type: Number, 
    required: true
  },
  endHour: {
    type: Number, 
    required: true
  },
  endMinute: {
    type: Number, 
    required: true
  },
  allDay: {
      type: Boolean,
      required: true
  }
});

calendarSchema.plugin(autoIncrement.plugin, {
    model: "Calendar",
    field: "_id",
    startAt: 1,
    incrementBy: 1,
  });

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;