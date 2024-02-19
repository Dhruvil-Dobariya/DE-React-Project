const mongoose = require("mongoose");
const FacultyLoginsModel = require("../../models/FacultyLogin");

const FacultyRegisterController = (req, res) => {
  const { email, subject, password } = req.body;
  FacultyLoginsModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      FacultyLoginsModel.create(req.body)
        .then((log_reg_form) => res.json(log_reg_form))
        .catch((err) => res.json(err));
    }
  });
};

module.exports = FacultyRegisterController;
