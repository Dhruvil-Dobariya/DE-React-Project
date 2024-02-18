const mongoose = require("mongoose");

const addStudentsSchema = mongoose.Schema({
  name: String,
  email: String,
  En_num: Number,
  password: String,
});

const addStudentsModels = mongoose.model("addStudents", addStudentsSchema);
module.exports = addStudentsModels;
