const addStudentsModels = require("../../models/AllUser");

const DeleteStudentController = (req, res) => {
  const id = req.params.id;
  addStudentsModels
    .findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
};

module.exports = DeleteStudentController;
