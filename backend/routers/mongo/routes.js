const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Report = require("../../models/mongo/schema");
const User = require("../../models/mongo/user");
const Entity = require("../../models/mongo/entity");
const router = express.Router();
const multer = require('multer');
const upload = multer();

// ✅ Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

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

// --------------------------------
// ✅ CREATE PLACE (alias for ENTITY)
// --------------------------------
router.post("/places", authenticateToken, upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, location, category, rating, reportedOn, commentsCount } = req.body;
    const created_by = req.user.userId;
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
    }
    if (!validateFields({ name, description, location, category })) {
      return res.status(400).json({ error: "Name, description, location, and category are required" });
    }
    const userExists = await User.findById(created_by);
    if (!userExists) {
      return res.status(404).json({ error: "Authenticated user not found" });
    }
    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({ error: "Name must be between 3 and 50 characters." });
    }
    if (description.length < 10 || description.length > 500) {
      return res.status(400).json({ error: "Description must be between 10 and 500 characters." });
    }
    const newEntity = new Entity({
      name,
      description,
      location,
      category,
      rating: rating !== undefined ? Number(rating) : 0,
      images,
      created_by,
      reportedOn: reportedOn ? new Date(reportedOn) : Date.now(),
      commentsCount: commentsCount !== undefined ? Number(commentsCount) : 0
    });
    await newEntity.save();
    res.status(201).json({ message: "Place created successfully!", entity: newEntity });
  } catch (error) {
    handleError(res, error, "Error creating place");
  }
});

// --------------------------------
// ✅ GET PLACES (alias for ENTITIES)
// --------------------------------
router.get("/places", async (req, res) => {
  try {
    const { created_by } = req.query;

    let filter = {};
    if (created_by && String(created_by).trim()) {
      if (!mongoose.Types.ObjectId.isValid(created_by)) {
        return res.status(400).json({ error: "Invalid user ID format" });
      }
      filter.created_by = created_by;
    }

    const entities = await Entity.find(filter);
    res.status(200).json({ places: entities });
  } catch (error) {
    handleError(res, error, "Error fetching places");
  }
});

// --------------------------------
// ✅ UPDATE PLACE (alias for ENTITY)
// --------------------------------
router.put("/places/:id", authenticateToken, upload.array('images', 5), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      category: req.body.category,
      rating: req.body.rating,
      reportedOn: req.body.reportedOn,
      commentsCount: req.body.commentsCount,
    };
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
    }
    const updated = await Entity.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: "Place not found" });
    res.json({ message: "Place updated!", entity: updated });
  } catch (err) {
    handleError(res, err, "Error updating place");
  }
});

// --------------------------------
// ✅ DELETE PLACE (alias for ENTITY)
// --------------------------------
router.delete("/places/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Entity.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Place not found" });
    res.json({ message: "Place deleted!" });
  } catch (err) {
    handleError(res, err, "Error deleting place");
  }
});

// At the end of routes.js
module.exports = router;
