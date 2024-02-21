const mongoose = require("mongoose");

const TOCSchema = new mongoose.Schema({
  data: String,
  subject: String,
  date: String,
  status: Boolean,
});
const TOCModel = mongoose.model("TOC", TOCSchema);

module.exports = TOCModel;
