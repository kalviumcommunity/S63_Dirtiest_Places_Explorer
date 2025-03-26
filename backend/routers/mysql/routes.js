const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../config/mySqlDb"); 
const router = express.Router();

// ✅ Helper function to validate fields
const validateFields = (fields) => {
  return Object.entries(fields).every(([key, value]) => {
    if (typeof value === "string") return value.trim().length > 0;
    return value !== null && value !== undefined;
  });
};

// ✅ Password Hashing
const hashPassword = async (password) => await bcrypt.hash(password, 10);

// ✅ Email and Password Validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => password.length >= 8;

// --------------------------------
// ✅ USER SIGNUP ROUTE
// --------------------------------
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!validateFields({ name, email, password })) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email format" });
  if (!isValidPassword(password)) return res.status(400).json({ error: "Password must be at least 8 characters long" });

  try {
    const [existingUser] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length) return res.status(409).json({ error: "Email already in use" });

    const hashedPassword = await hashPassword(password);
    await db.promise().query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error signing up user", details: error.message });
  }
});

// --------------------------------
// ✅ GET ALL USERS
// --------------------------------
router.get("/users", async (req, res) => {
  try {
    const [users] = await db.promise().query("SELECT id, name FROM users");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users", details: error.message });
  }
});

// --------------------------------
// ✅ CREATE ENTITY
// --------------------------------
router.post("/entities", async (req, res) => {
  const { name, description, created_by } = req.body;

  if (!validateFields({ name, description, created_by })) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [user] = await db.promise().query("SELECT * FROM users WHERE id = ?", [created_by]);
    if (!user.length) return res.status(404).json({ error: "User not found" });

    await db.promise().query(
      "INSERT INTO entities (name, description, created_by) VALUES (?, ?, ?)",
      [name, description, created_by]
    );
    res.status(201).json({ message: "Entity created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating entity", details: error.message });
  }
});

// --------------------------------
// ✅ GET ENTITIES (Filtered by User)
// --------------------------------
router.get("/entities", async (req, res) => {
  const { created_by, limit = 10, page = 1 } = req.query;

  try {
    const offset = (page - 1) * limit;
    const query = created_by
      ? "SELECT * FROM entities WHERE created_by = ? LIMIT ? OFFSET ?"
      : "SELECT * FROM entities LIMIT ? OFFSET ?";

    const params = created_by ? [created_by, parseInt(limit), parseInt(offset)] : [parseInt(limit), parseInt(offset)];
    const [entities] = await db.promise().query(query, params);

    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching entities", details: error.message });
  }
});

// --------------------------------
// ✅ GET ENTITY BY ID
// --------------------------------
router.get("/entities/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [entity] = await db.promise().query("SELECT * FROM entities WHERE id = ?", [id]);
    if (!entity.length) return res.status(404).json({ error: "Entity not found" });
    res.status(200).json(entity[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching entity", details: error.message });
  }
});

module.exports = router;
