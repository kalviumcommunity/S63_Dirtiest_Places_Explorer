// require("dotenv").config(); // Load environment variables
// const mongoose = require("mongoose");

// // MongoDB Connection Function
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("✅ MongoDB Connected Successfully!");
//     } catch (error) {
//         console.error("❌ MongoDB Connection Error:", error);
//         process.exit(1); // Exit process on failure
//     }
// };

// // Export the connection function
// module.exports = connectDB;
const mongoose = require("mongoose");
require ('dotenv').config();
const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`)
        })
        .catch((err) => {
            console.error(`Database connection failed: ${err.messsage}`)
        })
} 

module.exports = connectDatabase;



