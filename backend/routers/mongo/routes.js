const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Report = require("../../models/mongo/schema");
const User = require("../../models/mongo/user");
const Entity = require("../../models/mongo/entity");
const router = express.Router();

// ✅ Helper function for validation
const validateFields = (fields) => {
  return Object.entries(fields).every(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return validateFields(value);
    }
    if (typeof value === "string") return value.trim().length > 0;
    return value !== null && value !== undefined;
  });
};

// ✅ Centralized Error Handler
const handleError = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({ error: message, details: error.message });
};

// ✅ Password Hashing
const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
};

// ✅ Email Validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ✅ Password Validation
const isValidPassword = (password) => password.length >= 8;

// ✅ URL Validation
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// --------------------------------
// ✅ USER SIGNUP ROUTE
// --------------------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validateFields({ name, email, password })) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    handleError(res, error, "Signup Error");
  }
});

// --------------------------------
// ✅ GET ALL USERS (for Dropdown)
// --------------------------------
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name _id");
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error, "Error fetching users");
  }
});

// --------------------------------
// ✅ CREATE ENTITY WITH VALIDATION
// --------------------------------
router.post("/entities", async (req, res) => {
  try {
    const { name, description, created_by } = req.body;

    if (!validateFields({ name, description, created_by })) {
      return res.status(400).json({ error: "Name, description, and created_by are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(created_by)) {
      return res.status(400).json({ error: "Invalid created_by user ID" });
    }

    const userExists = await User.findById(created_by);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({ error: "Name must be between 3 and 50 characters." });
    }

    if (description.length < 10 || description.length > 500) {
      return res.status(400).json({ error: "Description must be between 10 and 500 characters." });
    }

    const newEntity = new Entity({ name, description, created_by });
    await newEntity.save();

    res.status(201).json({ message: "Entity created successfully!", entity: newEntity });
  } catch (error) {
    handleError(res, error, "Error creating entity");
  }
});

// --------------------------------
// ✅ GET ENTITIES (Filtered by User)
// --------------------------------
// ✅ GET ENTITIES (Filtered by User)
router.get("/entities", async (req, res) => {
  try {
    const { created_by } = req.query;

    let filter = {};
    if (created_by) {
      if (!mongoose.Types.ObjectId.isValid(created_by)) {
        return res.status(400).json({ error: "Invalid user ID format" });
      }
      filter.created_by = created_by;
    }

    const entities = await Entity.find(filter);
    res.status(200).json(entities);

  } catch (error) {
    handleError(res, error, "Error fetching entities"); // Ensure catch block is present
  }
});


// --------------------------------
// ✅ GET ENTITY BY ID
// --------------------------------
router.get("/entities/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid entity ID format" });
    }

    const entity = await Entity.findById(id);
    if (!entity) {
      return res.status(404).json({ error: "Entity not found" });
    }

    res.status(200).json(entity);
  } catch (error) {
    handleError(res, error, "Error fetching entity by ID");
  }
});

// At the end of routes.js
module.exports = router;
