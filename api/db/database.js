const mysql = require('mysql2')
const Sequelize = require('sequelize')
const PlaylistsModel = require('../models/playlists')
const UsersModel = require('../models/users')
const Playlist_Musics_Model = require('../models/playlist_music')
const Playlist_Users_Model = require('../models/playlist_user')

const sequelize = new Sequelize (
    'statsfy',
    'root',
    'password',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        sync: true
    }
);

sequelize.sync()

const playlists = PlaylistsModel(sequelize)
const users = UsersModel(sequelize)
const playlist_music = Playlist_Musics_Model(sequelize)
const playlist_user = Playlist_Users_Model(sequelize)

module.exports = {
    playlists,
    users,
    playlist_music,
    playlist_user
}
