const CreateFaculty = require("../../models/CreateFaculty");

const GetFacultyById = (req, res) => {
  const id = req.params.id;
  CreateFaculty.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

module.exports = GetFacultyById;
