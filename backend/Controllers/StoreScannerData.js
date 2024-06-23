const StoreScannerData = async (req, res) => {
  const { data, subject, date } = req.body;

  const collectionName = `${subject}`;
  const Model = require(`../models/All_Subject_Models/${collectionName}`);

  const existingData = await Model.findOne({
    data: data,
    subject: subject,
    date: date,
  });

  if (existingData) {
    console.log("Data already exists:", data);
    res.status(400).json({ error: "Data already exists", data });
  } else {
    await Model.create({
      data: data,
      subject: subject,
      date: date,
      status: "true",
    });

    console.log("Data added successfully:", data);
    res.json({ message: "Data added successfully", data });
  }
};

module.exports = StoreScannerData;
