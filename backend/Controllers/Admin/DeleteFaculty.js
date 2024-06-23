const CreateFaculty = require("../../models/CreateFaculty");

const DeleteFaculty = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await CreateFaculty.findByIdAndDelete({ _id: id });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

module.exports = DeleteFaculty;
