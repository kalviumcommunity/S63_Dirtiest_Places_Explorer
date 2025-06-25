const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportedOn: { type: Date, default: Date.now },
  commentsCount: { type: Number, default: 0 }
});

const Entity = mongoose.model('Entity', entitySchema);
module.exports = Entity;
