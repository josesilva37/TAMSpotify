const { playlist_music } = require('../../db/database')


function addSongToPlaylist(playlistId, musicId) {
    return new Promise((resolve, reject) => {
        playlist_music
        .create({
            playlistId: playlistId,
            musicId: musicId
        })
        .then((resp) => {
            resolve(resp);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

function getAllSongsFromPlaylist(playlistId) {
    return new Promise((resolve, reject) => {
        playlist_music
        .findAll({
            where: {
                playlistId: playlistId,
            }
        })
        .then((resp) => {
            resolve(resp);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    addSongToPlaylist,
    getAllSongsFromPlaylist
}