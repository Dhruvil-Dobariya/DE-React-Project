const mongoose = require("mongoose");

const scannedDataSchema = new mongoose.Schema({
  data: [String],
  subject: String,
  date: String,
});
const ScannedData = mongoose.model("ScannedData", scannedDataSchema);

module.exports = ScannedData;
