const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user"); // Import User model
require("dotenv").config(); // Load environment variables
const schema = require("./models/schema"); // Import the schema

const router = require("./routers/routes"); // Fix import issue

const app = express();

app.use(cors()); // Allow frontend access
app.use(express.json()); // Parse JSON requests

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// // Fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Use Routes
app.use("/api", router); // Fixed: using `routes` instead of `authRoutes`

// Start the server after connecting to the database
const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
