const mongoose = require("mongoose");

const StudentAttendance = new mongoose.Schema({
  name: String,
  En_num: Number,
  subject: String,
  date: Date,
  status: Boolean,
});

const StudentAttendanceModel = mongoose.model(
  "StudentAttendance",
  StudentAttendance
);

module.exports = StudentAttendanceModel;
