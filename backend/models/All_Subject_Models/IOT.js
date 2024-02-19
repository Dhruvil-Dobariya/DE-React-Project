const mongoose = require("mongoose");

const IOTSchema = new mongoose.Schema({
  data: [String],
  subject: String,
  date: String,
});
const IOTModel = mongoose.model("IOT", IOTSchema);

module.exports = IOTModel;
