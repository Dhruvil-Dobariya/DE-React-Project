const StoreScannerData = (req, res) => {
  const { data, subject, date } = req.body;

  const collectionName = `${subject}`;
  const Model = require(`../models/All_Subject_Models/${collectionName}`);

  Model.findOne({
    data: data,
    subject: subject,
    date: date,
  })
    .then((existingData) => {
      if (existingData) {
        console.log("Data already exists:", data);
        res.status(400).json({ error: "Data already exists", data });
      } else {
        Model.create({
          data: data,
          subject: subject,
          date: date,
          status: "true", 
        })
          .then(() => {
            console.log("Data added successfully:", data);
            res.json({ message: "Data added successfully", data });
          })
          .catch((error) => {
            console.error("Error adding data:", error);
            res.status(500).json({ error: "Failed to add data" });
          });
      }
    })
    .catch((error) => {
      console.error("Error checking existing data:", error);
      res.status(500).json({ error: "Failed to check existing data" });
    });
};

module.exports = StoreScannerData;
