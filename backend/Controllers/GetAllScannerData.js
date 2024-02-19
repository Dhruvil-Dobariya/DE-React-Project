const ScannedData = require("../models/ScannedData");

const GetAllScannerData = async (req, res) => {
  try {
    const scannedData = await ScannedData.find().lean();
    res.json(scannedData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};

module.exports = GetAllScannerData;
