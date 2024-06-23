const CreateFaculty = require("../../models/CreateFaculty");

const AllFaculty = async (req, res) => {
  try {
    const faculties = await CreateFaculty.find();
    res.json(faculties);
  } catch (error) {
    console.error("Error fetching faculties:", error);
    res.status(500).json({ message: "Failed to fetch faculties" });
  }
};

module.exports = AllFaculty;
