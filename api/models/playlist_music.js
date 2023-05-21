const { DataTypes } = require('sequelize');
const Playlists = require('./playlists');

module.exports = function PlaylistsMusics(sequelize) {
  const PlaylistsMusics = sequelize.define('playlists_musics', {
    playlistId: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    musicId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  }, {
    timestamps: false, // Disable createdAt and updatedAt
  });

  // Define associations
  PlaylistsMusics.belongsTo(Playlists(sequelize), { foreignKey: 'playlistId' });

  return PlaylistsMusics;
};
