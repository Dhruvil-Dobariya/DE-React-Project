const mongoose = require("mongoose");

const scannedDataSchema = new mongoose.Schema({
  data: Number,
  subject: String,
  date: String,
  status: Boolean,
});
const ScannedData = mongoose.model("ScannedData", scannedDataSchema);

module.exports = ScannedData;
