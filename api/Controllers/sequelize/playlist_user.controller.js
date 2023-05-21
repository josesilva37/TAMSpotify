const { playlist_user } = require('../../db/database')


function createPlaylistUser(playlistId, userEmail) {
    return new Promise((resolve, reject) => {
        playlist_user
        .create({
            playlistId: playlistId,
            userEmail: userEmail
        })
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

function getUsersPlaylists(userEmail) {
    return new Promise((resolve, reject) => {
        playlist_user
        .findAll({
            where: {
              userEmail: userEmail,
            },
          })
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        });
    });
}


function getPlaylistUsers(playlistId) {
    return new Promise((resolve, reject) => {
        playlist_user
        .findAll({
            where: {
                playlistId: playlistId,
            },
          })
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    createPlaylistUser,
    getUsersPlaylists,
    getPlaylistUsers
}