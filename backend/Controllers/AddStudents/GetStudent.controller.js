const addStudentsModels = require("../../models/AllUser");

const GetStudentController = (req, res) => {
  addStudentsModels
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};
module.exports = GetStudentController;
