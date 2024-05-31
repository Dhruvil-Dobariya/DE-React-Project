const mongoose = require("mongoose");

const DE_2BSchema = new mongoose.Schema({
  data: String,
  subject: String,
  date: String,
  status: Boolean,
});
const DE_2BModel = mongoose.model("DE_2B", DE_2BSchema);

module.exports = DE_2BModel;
