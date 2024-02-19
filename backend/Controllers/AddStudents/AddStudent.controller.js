const addStudentsModels = require("../../models/AllUser");

const AddStudentController = (req, res) => {
  const newUser = {
    En_num: req.body.En_num,
    name: req.body.name,
    status: false,
  };
  addStudentsModels
    .create(req.body)
    .then(() => res.json(user))
    .catch((err) => res.json(err));
};

module.exports = AddStudentController;
