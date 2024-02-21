const mongoose = require("mongoose");

const MPISchema = new mongoose.Schema({
  data: String,
  subject: String,
  date: String,
  status: Boolean,
});
const MPIModel = mongoose.model("MPI", MPISchema);

module.exports = MPIModel;
