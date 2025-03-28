const express = require("express");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

// Login Endpoint
router.post("/login", (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }
    res.cookie("username", username, { httpOnly: true, maxAge: 3600000 }); // 1-hour expiry
    res.json({ message: "Login successful", username });
});

// Logout Endpoint
router.post("/logout", (req, res) => {
    res.clearCookie("username");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
