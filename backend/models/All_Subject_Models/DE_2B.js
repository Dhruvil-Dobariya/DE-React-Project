const mongoose = require("mongoose");

const DE_2BSchema = new mongoose.Schema({
  data: [String],
  subject: String,
  date: String,
});
const DE_2BModel = mongoose.model("TOC", DE_2BSchema);

module.exports = DE_2BModel;
