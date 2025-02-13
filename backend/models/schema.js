const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", reportSchema);
