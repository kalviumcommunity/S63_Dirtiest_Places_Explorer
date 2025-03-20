const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model("Report", reportSchema);
