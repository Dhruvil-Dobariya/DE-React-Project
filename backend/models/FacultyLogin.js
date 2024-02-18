const mongoose = require("mongoose");

const FacultyLoginsSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  password: String,
});

const FacultyLoginsModel = mongoose.model("FacultyLogins", FacultyLoginsSchema);

module.exports = FacultyLoginsModel;
