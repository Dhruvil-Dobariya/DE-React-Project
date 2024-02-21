const mongoose = require("mongoose");

const IPDCSchema = new mongoose.Schema({
  data: String,
  subject: String,
  date: String,
  status: Boolean,
});
const IPDCModel = mongoose.model("IPDC", IPDCSchema);

module.exports = IPDCModel;
