const CreateFaculty = require("../../models/CreateFaculty");

const UpdateFaculty = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedFaculty = await CreateFaculty.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        password: req.body.password,
      },
      { new: true }
    );
    res.json(updatedFaculty);
  } catch (err) {
    res.json(err);
  }
};

module.exports = UpdateFaculty;
