const mongoose = require("mongoose");
const FacultyLoginsModel = require("../../models/FacultyLogin");
const bcrypt = require("bcryptjs");

const FacultyRegisterController = async (req, res) => {
  try {
    const { email, subject, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await FacultyLoginsModel.findOne({ email: email });

    if (existingUser) {
      res.json("Already registered");
    } else {
      const newUser = await FacultyLoginsModel.create({
        ...req.body,
        password: hashedPassword,
      });
      res.json(newUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = FacultyRegisterController;
