const GetStudentById = (req, res) => {
  const id = req.params.id;
  addStudentsModels
    .findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

module.exports = GetStudentById;
