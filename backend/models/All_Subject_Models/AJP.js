const mongoose = require("mongoose");

const AJPSchema = new mongoose.Schema({
  data: [String],
  subject: String,
  date: String,
});
const AJPModel = mongoose.model("TOC", AJPSchema);

module.exports = AJPModel;
