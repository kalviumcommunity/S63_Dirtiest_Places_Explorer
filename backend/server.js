const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoRoutes = require("./routers/mongo/routes");
const mysqlRoutes = require("./routers/mysql/routes");
const authRoutes =  require("./routers/mongo/auth");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Connect to MySQL using mysql2
const mysqlDB = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

mysqlDB.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  } else {
    console.log("✅ MySQL connected successfully");
  }
});

// API Routes
app.use("/api", mongoRoutes);
app.use("/api/mysql", mysqlRoutes);
app.use("/api/mongo", authRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling for server errors
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT;

connectMongoDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});