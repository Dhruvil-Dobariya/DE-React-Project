const ScannedData = require("../models/ScannedData");

const StoreScannerData = (req, res) => {
  const { data, subject, date } = req.body;

  Promise.all(
    data.map((item) => {
      return ScannedData.findOne({
        data: item,
        subject: subject,
        date: date,
      }).then((existingData) => {
        if (existingData) {
          console.log("Data already exists:", item);
          return Promise.resolve({ alreadyExists: true, data: item });
        } else {
          return ScannedData.create({
            data: item,
            subject: subject,
            date: date,
          }).then(() => {
            return { alreadyExists: false, data: item };
          });
        }
      });
    })
  )
    .then((results) => {
      const addedData = results.filter(
        (result) => result !== null && !result.alreadyExists
      );
      const alreadyExistingData = results.filter(
        (result) => result !== null && result.alreadyExists
      );
      console.log("Data added successfully:", addedData);
      console.log("Data already exists:", alreadyExistingData);

      if (addedData.length > 0) {
        res.json({ message: "Data added successfully", addedData });
      } else if (alreadyExistingData.length > 0) {
        res
          .status(400)
          .json({ error: "Data already exists", alreadyExistingData });
      } else {
        res.status(400).json({ error: "Failed to add data" });
      }
    })
    .catch((error) => {
      console.error("Error adding data:", error);
      res.status(500).json({ error: "Failed to add data" });
    });
};

module.exports = StoreScannerData;
