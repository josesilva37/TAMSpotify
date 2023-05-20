const { DataTypes } = require('sequelize');

module.exports = function Playlists(sequelize) {
  return sequelize.define('Playlists', {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
};
