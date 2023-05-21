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
    const response = await fetch(globalUrl + "/spotify/UserAlbums/" +  id + '/'  +   + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
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
    const response = await fetch(globalUrl + "/spotify/listLikedSongs/" +  offset + '/'  +   + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
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
    const response = await fetch(globalUrl + "/spotify/isLikedSong/" +  id + '/'  +   + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
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
  addLikedSong: addLikedSong,
  listLikedSongs: listLikedSongs,
  deleteLikedSong: deleteLikedSong,
  isLikedSong: isLikedSong
}