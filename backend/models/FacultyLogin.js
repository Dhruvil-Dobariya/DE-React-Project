const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const FacultyLoginsSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  password: String,
});

FacultyLoginsSchema.methods.comparePassword = async function (facultyPassword) {
  const isMatch = await bcrypt.compare(facultyPassword, this.password);
  return isMatch;
};

const FacultyLoginsModel = mongoose.model("FacultyLogins", FacultyLoginsSchema);

module.exports = FacultyLoginsModel;
