const mongoose = require("mongoose");

const IOTSchema = new mongoose.Schema({
  data: String,
  subject: String,
  date: String,
  status: Boolean,
});
const IOTModel = mongoose.model("IOT", IOTSchema);

module.exports = IOTModel;
