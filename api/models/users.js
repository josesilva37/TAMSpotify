const { DataTypes } = require('sequelize');

module.exports = function Users(sequelize) {
  return sequelize.define('users', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false, // Disable createdAt and updatedAt
  });
};
