const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/user");
const routes = require("./routers/routes");

dotenv.config();

const app = express();

// Validate environment variables
if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error("❌ Missing environment variables (MONGO_URI or PORT)");
  process.exit(1);
}

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://your-frontend-domain.com"],
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Fetch all users (Optional if routes are already defined in routes.js)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// Routes
app.use("/api", routes);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling for other server errors
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
