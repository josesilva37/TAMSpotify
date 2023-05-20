const { DataTypes } = require('sequelize');

module.exports = function Users(sequelize) {
  return sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
};
