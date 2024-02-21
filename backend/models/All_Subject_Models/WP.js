const mongoose = require("mongoose");

const WPSchema = new mongoose.Schema({
  data: String,
  subject: String,
  date: String,
  status: Boolean,
});
const WPModel = mongoose.model("WP", WPSchema);

module.exports = WPModel;
