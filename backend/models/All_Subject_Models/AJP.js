const mongoose = require("mongoose");

const AJPSchema = new mongoose.Schema({
  data: String,
  subject: String,
  date: String,
  status: Boolean,
});
const AJPModel = mongoose.model("AJP", AJPSchema);

module.exports = AJPModel;
