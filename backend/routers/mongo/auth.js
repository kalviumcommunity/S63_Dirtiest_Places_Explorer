const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../../models/mongo/user");

dotenv.config(); // Load environment variables

const router = express.Router();
router.use(cookieParser());

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
    console.error("❌ JWT_SECRET is missing in .env file");
    process.exit(1); // Stop the server if JWT_SECRET is not set
}

// 🔹 Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("Signup attempt:", { username, email }); // Log signup attempt

        if (!username || !email || !password) {
            return res.status(400).json({ 
                error: "All fields are required",
                details: {
                    username: !username ? "Username is required" : null,
                    email: !email ? "Email is required" : null,
                    password: !password ? "Password is required" : null
                }
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { name: username }] 
        });
        console.log("Existing user check:", existingUser ? "Found" : "Not found"); // Log existing user check

        if (existingUser) {
            const errorDetails = {
                email: existingUser.email === email ? "Email already in use" : null,
                username: existingUser.name === username ? "Username already taken" : null
            };
            
            return res.status(409).json({ 
                error: "User already exists",
                details: errorDetails
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully"); // Log password hashing
        
        // Create new user
        const user = new User({
            name: username,
            email,
            password: hashedPassword
        });

        // Save user to database
        await user.save();
        console.log("User saved successfully:", { id: user._id, email: user.email }); // Log successful save
        
        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, username, email }, 
            SECRET_KEY, 
            { expiresIn: "1h" }
        );

        // Store Token in HTTP-Only Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000, // 1 hour
        });

        res.status(201).json({ 
            message: "✅ Signup successful", 
            token,
            user: { 
                id: user._id,
                username: user.name, 
                email: user.email 
            }
        });
    } catch (err) {
        console.error("❌ Signup Error:", err.message);
        res.status(500).json({ 
            error: "Internal server error",
            details: process.env.NODE_ENV === "development" ? err.message : undefined
        });
    }
});

// 🔹 Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for email:", email); // Log login attempt

        if (!email || !password) {
            return res.status(400).json({ 
                error: "Email and password are required",
                details: {
                    email: !email ? "Email is required" : null,
                    password: !password ? "Password is required" : null
                }
            });
        }

        // Find user
        const user = await User.findOne({ email });
        console.log("User found:", user ? {
            id: user._id,
            email: user.email,
            username: user.name
        } : "No user found"); // Log detailed user info

        if (!user) {
            return res.status(401).json({ 
                error: "Invalid credentials",
                details: "No user found with this email"
            });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log("Password validation result:", isValidPassword); // Log password validation

        if (!isValidPassword) {
            return res.status(401).json({ 
                error: "Invalid credentials",
                details: "Incorrect password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, username: user.name, email: user.email }, 
            SECRET_KEY, 
            { expiresIn: "1h" }
        );

        // Store Token in HTTP-Only Cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000, // 1 hour
        });

        console.log("Login successful for user:", { id: user._id, email: user.email }); // Log successful login

        res.json({ 
            message: "✅ Login successful", 
            token,
            user: {
                id: user._id,
                username: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error("❌ Login Error:", err.message);
        res.status(500).json({ 
            error: "Internal server error",
            details: process.env.NODE_ENV === "development" ? err.message : undefined
        });
    }
});

// 🔹 Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "✅ Logged out successfully" });
});

// 🔹 Protected Profile Route
router.get("/profile", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ 
            message: "✅ Access granted", 
            user: {
                id: user._id,
                username: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error("❌ JWT Verification Error:", err.message);
        res.status(403).json({ error: "Invalid or expired token" });
    }
});

module.exports = router;
