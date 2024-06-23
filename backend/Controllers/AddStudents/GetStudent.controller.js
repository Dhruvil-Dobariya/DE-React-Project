const addStudentsModels = require("../../models/AllUser");

const GetStudentController = async (req, res) => {
  try {
    const users = await addStudentsModels.find({});
    res.json(users);
  } catch (err) {
    res.json(err);
  }
};

module.exports = GetStudentController;