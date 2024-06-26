const mongoose = require("mongoose");
const FacultyLoginsModel = require("../../models/FacultyLogin");

const FacultyLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await FacultyLoginsModel.findOne({ email: email });
    if (user) {
      const isPassword = user.comparePassword(password);
      if (isPassword) {
        res.json({
          status: "Success",
          subject: user.subject,
          email: user.email,
        });
      } else {
        res.json("Wrong password");
      }
    } else {
      res.json("No records found!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = FacultyLoginController;
