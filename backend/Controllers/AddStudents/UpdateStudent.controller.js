const addStudentsModels = require("../../models/AllUser");

const UpdateStudentController = (req, res) => {
  const id = req.params.id;
  addStudentsModels
    .findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        En_num: req.body.En_num,
        password: req.body.password,
      }
    )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

module.exports = UpdateStudentController;
