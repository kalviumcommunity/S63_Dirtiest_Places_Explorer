const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Entity = mongoose.model('Entity', entitySchema);
module.exports = Entity;
