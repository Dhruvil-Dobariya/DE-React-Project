const mongoose = require("mongoose");
const Model = require(`../models/All_Subject_Models/${collectionName}`);

const ShowRecords = async (req, res) => {
  try {
    const { subject } = req.query;
    const collectionName = `${subject}`;
    const data = await Model.find({});
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = ShowRecords;
