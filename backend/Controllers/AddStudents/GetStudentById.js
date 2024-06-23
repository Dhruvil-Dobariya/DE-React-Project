const addStudentsModels = require("../../models/AllUser");

const GetStudentById = (req, res) => {
  const id = req.params.id;
  addStudentsModels
    .findById({ _id: id })
    .select("-password")
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

module.exports = GetStudentById;
