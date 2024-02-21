const AllUser = require("../models/AllUser");

const AddAbsent = async (req, res) => {
  const { date, subject } = req.body;
  console.log("ARRIVED", date, subject);

  try {
    // Fetch all students from AllUser collection
    const allStudents = await AllUser.find({}, { En_num: 1, _id: 0 });
    console.log("allStudents", allStudents);

    // Get the appropriate Mongoose model dynamically
    const collectionName = `${subject}`;
    const SubjectModel = require(`../models/All_Subject_Models/${collectionName}`);

    // Fetch students who are present in the AllUser collection but not in the subject collection for the given date and subject
    const presentStudents = await SubjectModel.distinct("data", { date: date });
    console.log("presentStudents", presentStudents);

    const presentEnNums = presentStudents.map((student) => student.toString()); // Extract En_num values
    console.log(presentEnNums);

    // Filter out absent students
    const absentStudents = allStudents.filter(
      (student) => !presentEnNums.includes(student.En_num.toString())
    );

    console.log("absentStudents", absentStudents);

    // Add absent students to the subject collection with status: false
    const insertResult = await SubjectModel.insertMany(
      absentStudents.map((student) => ({
        data: student.En_num.toString(),
        subject,
        date,
        status: false,
      }))
    );

    // Log a success message
    console.log("Absent students added successfully:", insertResult);

    // Send a response indicating success
    res.json({ message: "Absent students added successfully" });
  } catch (error) {
    console.error("Error adding absent students:", error);
    res.status(500).json({
      error: "Failed to add absent students",
      detailedError: error,
    });
  }
};

module.exports = AddAbsent;
