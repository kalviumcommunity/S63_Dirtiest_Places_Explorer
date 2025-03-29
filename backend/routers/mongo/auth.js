const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const router = express.Router();
router.use(cookieParser());

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
    console.error("❌ JWT_SECRET is missing in .env file");
    process.exit(1); // Stop the server if JWT_SECRET is not set
}

// 🔹 Login Route
router.post("/login", (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        // Generate JWT Token
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

        // Store Token in HTTP-Only Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
            maxAge: 3600000, // 1 hour
        });

        res.json({ message: "✅ Login successful", token });
    } catch (err) {
        console.error("❌ JWT Signing Error:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 🔹 Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "✅ Logged out successfully" });
});

// 🔹 Protected Profile Route
router.get("/profile", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: "✅ Access granted", user: decoded });
    } catch (err) {
        console.error("❌ JWT Verification Error:", err.message);
        res.status(403).json({ error: "Invalid or expired token" });
    }
});

module.exports = router;
