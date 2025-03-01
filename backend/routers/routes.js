const express = require("express");
const Report = require("../models/schema"); // Report schema
const User = require("../models/user"); // User schema
const Entity = require("../models/entity"); // Entity schema
const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user (storing password as plain text)
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create a new report
router.post("/reports", async (req, res) => {
  try {
    const { description, category, latitude, longitude, imageUrl } = req.body;

    if (!description || !category || !latitude || !longitude || !imageUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReport = new Report({
      description,
      category,
      location: { latitude, longitude },
      imageUrl,
    });

    await newReport.save();
    res.status(201).json({ message: "Report created successfully!", report: newReport });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Error creating report", details: error.message });
  }
});

// Get all reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Error fetching reports", details: error.message });
  }
});

// CRUD Routes for Entities

// Create a new entity
router.post("/entities", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required" });
    }

    const newEntity = new Entity({ name, description });
    await newEntity.save();
    res.status(201).json({ message: "Entity created successfully!", entity: newEntity });
  } catch (error) {
    console.error("Error creating entity:", error);
    res.status(500).json({ error: "Error creating entity", details: error.message });
  }
});

// Get all entities
router.get("/entities", async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).json(entities);
  } catch (error) {
    console.error("Error fetching entities:", error);
    res.status(500).json({ error: "Error fetching entities", details: error.message });
  }
});

// Get a single entity by ID
router.get("/entities/:id", async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (!entity) return res.status(404).json({ error: "Entity not found" });
    res.status(200).json(entity);
  } catch (error) {
    console.error("Error fetching entity:", error);
    res.status(500).json({ error: "Error fetching entity", details: error.message });
  }
});

// Update an entity
router.put("/entities/:id", async (req, res) => {
  try {
    const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEntity) return res.status(404).json({ error: "Entity not found" });
    res.status(200).json({ message: "Entity updated successfully!", entity: updatedEntity });
  } catch (error) {
    console.error("Error updating entity:", error);
    res.status(500).json({ error: "Error updating entity", details: error.message });
  }
});

// Delete an entity
router.delete("/entities/:id", async (req, res) => {
  try {
    const deletedEntity = await Entity.findByIdAndDelete(req.params.id);
    if (!deletedEntity) return res.status(404).json({ error: "Entity not found" });
    res.status(200).json({ message: "Entity deleted successfully!" });
  } catch (error) {
    console.error("Error deleting entity:", error);
    res.status(500).json({ error: "Error deleting entity", details: error.message });
  }
});

module.exports = router;
