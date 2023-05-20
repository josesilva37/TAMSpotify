const { DataTypes } = require('sequelize');
const Playlists = require('./playlists');
const Users = require('./users');

module.exports = function PlaylistUsers(sequelize) {
  const PlaylistUsers = sequelize.define('playlist_users', {
    playlistId: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  }, {
    timestamps: false, // Disable createdAt and updatedAt
  });

  // Define associations
  PlaylistUsers.belongsTo(Playlists(sequelize), { foreignKey: 'playlistId' });
  PlaylistUsers.belongsTo(Users(sequelize), { foreignKey: 'userEmail' });

  return PlaylistUsers;
};
