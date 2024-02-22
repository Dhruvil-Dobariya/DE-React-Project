const StudentRecords = async (req, res) => {
  const { En_num } = req.query;
  const { subject } = req.params;

  try {
    const collectionName = `${subject}`;
    const Model = require(`../models/All_Subject_Models/${collectionName}`);
    const data = await Model.find({ data: En_num });
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};

module.exports = StudentRecords;
