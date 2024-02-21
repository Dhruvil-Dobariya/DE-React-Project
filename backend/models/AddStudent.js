const AllUser = require("./AllUser.js");

const AddAbsentStudentsToSubjectCollection = async (req, res) => {
  try {
    const { subject, date, scannedDataHistory } = req.body;

    // Fetch all students from AddStudent collection
    const addStudents = await AllUser.find({});

    // Define the collection name based on subject
    const collectionName = `${subject}`;
    const Model = require(`../models/All_Subject_Models/${collectionName}`);

    // Fetch students present in subject collection
    const presentStudents = await Model.find({
      date: date,
      status: true,
    }).distinct("En_num");

    // Find students absent in subject collection
    const absentStudents = addStudents.filter(
      (student) => !presentStudents.includes(student.En_num)
    );

    // Add absent students to subject collection with status false
    await Model.insertMany(
      absentStudents.map((student) => ({
        En_num: student.En_num,
        subject: subject,
        date: date,
        status: false,
      }))
    );

    res.json({ message: "Absent students added successfully" });
  } catch (error) {
    console.error("Error adding absent students:", error);
    res.status(500).json({ error: "Failed to add absent students" });
  }
};

module.exports = AddAbsentStudentsToSubjectCollection;
