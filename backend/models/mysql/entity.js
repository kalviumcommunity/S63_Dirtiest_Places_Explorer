const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Entity = sequelize.define('Entity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  latitude: {
    type: DataTypes.DOUBLE,
  },
  longitude: {
    type: DataTypes.DOUBLE,
  }
}, { timestamps: true });

// Relationship
User.hasMany(Entity, { foreignKey: 'created_by', onDelete: 'CASCADE' });
Entity.belongsTo(User, { foreignKey: 'created_by' });

module.exports = Entity;
