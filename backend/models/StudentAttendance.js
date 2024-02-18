const mongoose = require("mongoose");

const StudentAtSchema = mongoose.Schema({
  result: Number,
  Date: Date,
  Subject: String,
});

const StudentAtModels = mongoose.model("Student-Attendance", StudentAtSchema);
module.exports = StudentAtModels;
