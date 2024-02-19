const mongoose = require("mongoose");

const IndianConstitutionSchema = new mongoose.Schema({
  data: [String],
  subject: String,
  date: String,
});
const ScannedData_IndianConstitution = mongoose.model(
  "IndianConstitution",
  IndianConstitutionSchema
);

module.exports = ScannedData_IndianConstitution;
