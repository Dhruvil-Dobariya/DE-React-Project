const mongoose = require("mongoose");
const addStudentsModels = require("../../models/AllUser");

const StudentLoginController = (req, res) => {
  const { En_num, password } = req.body;
  addStudentsModels.findOne({ En_num: En_num }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    } else {
      res.json("No records found! ");
    }
  });
};

module.exports = StudentLoginController;
