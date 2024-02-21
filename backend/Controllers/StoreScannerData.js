// const ScannedData = require("../models/ScannedData");

// const StoreScannerData = (req, res) => {
//   const { data, subject, date, status } = req.body;

//   // Define the collection name based on subject
//   const collectionName = `${subject}`;
//   const Model = require(`../models/All_Subject_Models/${collectionName}`);

//   Promise.all(
//     data.map((item) => {
//       return Model.findOne({
//         data: item,
//         subject: subject,
//         date: date,
//         status: status,
//       }).then((existingData) => {
//         if (existingData) {
//           console.log("Data already exists:", item);
//           return Promise.resolve({ alreadyExists: true, data: item });
//         } else {
//           return Model.create({
//             data: item,
//             subject: subject,
//             date: date,
//             status: "true",
//           }).then(() => {
//             return { alreadyExists: false, data: item };
//           });
//         }
//       });
//     })
//   )
//     .then((results) => {
//       const addedData = results.filter(
//         (result) => result !== null && !result.alreadyExists
//       );
//       const alreadyExistingData = results.filter(
//         (result) => result !== null && result.alreadyExists
//       );
//       console.log("Data added successfully:", addedData);
//       console.log("Data already exists:", alreadyExistingData);

//       if (addedData.length > 0) {
//         res.json({ message: "Data added successfully", addedData });
//       } else if (alreadyExistingData.length > 0) {
//         res
//           .status(400)
//           .json({ error: "Data already exists", alreadyExistingData });
//       } else {
//         res.status(400).json({ error: "Failed to add data" });
//       }
//     })
//     .catch((error) => {
//       console.error("Error adding data:", error);
//       res.status(500).json({ error: "Failed to add data" });
//     });
// };

// module.exports = StoreScannerData;

const StoreScannerData = (req, res) => {
  const { data, subject, date } = req.body;

  // Define the collection name based on subject
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
        // Save the item as a string instead of an array
        Model.create({
          data: data,
          subject: subject,
          date: date,
          status: "true", // assuming status is a string in the database
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
