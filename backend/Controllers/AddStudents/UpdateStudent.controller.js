const addStudentsModels = require("../../models/AllUser");

const UpdateStudentController = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await addStudentsModels.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        En_num: req.body.En_num,
        password: req.body.password,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json(err);
  }
};

module.exports = UpdateStudentController;
