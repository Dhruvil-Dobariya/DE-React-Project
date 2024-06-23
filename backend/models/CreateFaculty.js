const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const CreateFaculty = mongoose.model("FacultyLogin", facultySchema);

module.exports = CreateFaculty;
