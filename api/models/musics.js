const { DataTypes } = require('sequelize');

module.exports = function Musics(sequelize) {
  return sequelize.define('musics', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    added_by: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false, // Disable createdAt and updatedAt
  });
};
