const addStudentsModels = require("../../models/AllUser");
const bcrypt = require("bcryptjs");

const AddStudentController = async (req, res) => {
  const newUser = {
    En_num: req.body.En_num,
    name: req.body.name,
    status: false,
  };
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  addStudentsModels
    .create(req.body)
    .then(() => res.json(user))
    .catch((err) => res.json(err));
};

module.exports = AddStudentController;
