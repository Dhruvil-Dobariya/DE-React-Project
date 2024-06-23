const addStudentsModels = require("../../models/AllUser");

const DeleteStudentController = async (req, res) => {
  const id = req.params.id;
  
  try {
    const result = await addStudentsModels.findByIdAndDelete({ _id: id });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

module.exports = DeleteStudentController;