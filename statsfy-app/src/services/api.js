const globalUrl = "http://localhost:3080"

async function getUser() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/User/" + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
async function getUserPlaylists() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/UserPlaylists/" + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
async function getUserTopTracks(time) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/UserTopTracks/" +  time + '/'  +  window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
async function getUserTopArtists(time) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/UserTopArtists/" +  time + '/'  +  window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function getUserAlbums() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/UserAlbums/" + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
async function getUserAlbum(id) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/UserAlbum/" +  id + '/' + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
async function addLikedSong(id) {
  var requestOptions = {
    method: 'PUT',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/addLikedSong/" +  id + '/'  +   + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
async function listLikedSongs(offset) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/listLikedSongs/" +  offset + '/'  + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
async function deleteLikedSong(id) {
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/deleteLikedSong/" +  id + '/'  +   + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function isLikedSong(id) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/isLikedSong/" +  id + '/'   + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}


async function userExist(email) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/userExist/" + email, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function createUserDb(email, nome) {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/createUserDb/" + email + "/" + nome, requestOptions);
    const data = await response.status;
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function createPlaylist(name) {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/createPlaylist/" + name , requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function createPlaylistUser(playlistId, userEmail) {

  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/createPlaylistUser/" + playlistId + "/" + userEmail , requestOptions);
    const data = await response.status;
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function getUsersPlaylistDb(email) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/getUsersPlaylits/" + email, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function getPlaylistUsersDb(playlistId) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/getPlaylistUsers/" + playlistId, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function addSongToPlaylist(playlistId, musicId) {

  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/addSongToPlaylist/" + playlistId + "/" + musicId , requestOptions);
    const data = await response.status;
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}


async function getAllSongsFromPlaylist(playlistId) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/getAllSongsFromPlaylist/" + playlistId, requestOptions);
    const data = await response.json();

    // Call the endpoint for each musicId
    const trackPromises = data.map(async (song) => {
      const trackResponse = await fetch(globalUrl + "/spotify/getTrack/" + song.musicId + '/' + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
      const trackData = await trackResponse.json();
      return trackData;
    });

    const tracks = await Promise.all(trackPromises);
    return tracks;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}


async function addUserToPlaylist(playlistId, userEmail) {

  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  };

  try {
    const response = await fetch(globalUrl + "/spotify/addUserToPlaylist/" + playlistId + "/" + userEmail , requestOptions);
    const data = await response.status;
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

module.exports = {
  getUser: getUser,
  getUserPlaylists: getUserPlaylists,
  getUserTopTracks: getUserTopTracks,
  getUserTopArtists: getUserTopArtists,
  getUserAlbums:getUserAlbums,
  getUserAlbum: getUserAlbum,
  userExist: userExist,
  createUserDb: createUserDb,
  createPlaylist: createPlaylist,
  createPlaylistUser: createPlaylistUser,
  getUsersPlaylistDb: getUsersPlaylistDb,
  getPlaylistUsersDb,
  addLikedSong: addLikedSong,
  listLikedSongs: listLikedSongs,
  deleteLikedSong: deleteLikedSong,
  isLikedSong: isLikedSong,
  addSongToPlaylist,
  getAllSongsFromPlaylist,
  addUserToPlaylist
}