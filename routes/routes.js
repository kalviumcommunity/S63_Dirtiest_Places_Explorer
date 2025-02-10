const express = require("express");
const Report = require("../models/schema"); // Import the schema
const router = express.Router();

// Create a new report
router.post("/reports", async (req, res) => {
  try {
    const { description, category, latitude, longitude, imageUrl } = req.body;
    const newReport = new Report({ description, category, latitude, longitude, imageUrl });
    await newReport.save();
    res.status(201).json({ message: "Report created successfully!", report: newReport });
  } catch (error) {
    res.status(500).json({ error: "Error creating report" });
  }
});

// Get all reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reports" });
  }
});

// Get a single report by ID
router.get("/reports/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: "Error fetching report" });
  }
});

// Update a report
router.put("/reports/:id", async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReport) return res.status(404).json({ error: "Report not found" });
    res.status(200).json({ message: "Report updated successfully!", report: updatedReport });
  } catch (error) {
    res.status(500).json({ error: "Error updating report" });
  }
});

// Delete a report
router.delete("/reports/:id", async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) return res.status(404).json({ error: "Report not found" });
    res.status(200).json({ message: "Report deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting report" });
  }
});

module.exports = router;
