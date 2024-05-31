const AllUser = require("../models/AllUser");

const AddAbsent = async (req, res) => {
  const { date, subject } = req.body;
  console.log("ARRIVED", date, subject);

  try {
    const allStudents = await AllUser.find({}, { En_num: 1, _id: 0 });
    console.log("allStudents", allStudents);

    const collectionName = `${subject}`;
    const SubjectModel = require(`../models/All_Subject_Models/${collectionName}`);

    const presentStudents = await SubjectModel.distinct("data", { date: date });
    console.log("presentStudents", presentStudents);

    const presentEnNums = presentStudents.map((student) => student.toString());
    console.log(presentEnNums);

    const absentStudents = allStudents.filter(
      (student) => !presentEnNums.includes(student.En_num.toString())
    );

    console.log("absentStudents", absentStudents);

    const insertResult = await SubjectModel.insertMany(
      absentStudents.map((student) => ({
        data: student.En_num.toString(),
        subject,
        date,
        status: false,
      }))
    );

    console.log("Absent students added successfully:", insertResult);

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
