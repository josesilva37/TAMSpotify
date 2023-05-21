const { playlists } = require('../../db/database')

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
}



function createPlaylist(nome) {
    return new Promise((resolve, reject) => {
        const playlistId = generateRandomString(20);

        playlists
        .create({
            id: playlistId,
            name: nome
        })
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        });
    });
}


function getPlaylistById(playlistId) {
    return new Promise((resolve, reject) => {
        playlists
        .findOne({
            where: {
                id: playlistId
            }
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
    createPlaylist,
    getPlaylistById
}