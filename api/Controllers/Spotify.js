const fetch = require("node-fetch");


async function getUser(token) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch("https://api.spotify.com/v1/me", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error", error));
}

async function getUserPlaylists(token) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch("https://api.spotify.com/v1/me/playlists", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error", error));
}

async function getUserTopTracks(token, time) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  let tempo = "short_term";
  switch (parseInt(time)) {
    case 1:
      tempo = "short_term";
      break;
    case 2:
      tempo = "medium_term";
      break;
    case 3:
      tempo = "long_term";
      break;
  }
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=${tempo}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error", error));
}

async function getUserTopArtists(token, time) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  let tempo = "medium_term";
  switch (parseInt(time)) {
    case 1:
      tempo = "short_term";
      break;
    case 2:
      tempo = "medium_term";
      break;
    case 3:
      tempo = "long_term";
      break;
  }

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${tempo}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error", error));
}

async function getUserAlbums(token) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch("https://api.spotify.com/v1/me/albums", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error", error));
}

async function getAlbum(token, id) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`https://api.spotify.com/v1/albums/${id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error", error));
}

async function addLikedSong(token, id) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, requestOptions)
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error", error));
}

async function getLikedSongs(token, offset) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=50`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error", error));
}

async function deleteLikedSong(token, id) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error", error));
}

async function checkIfLikedSong(token, id) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`,
    requestOptions
  )
    // .then(response => response.text())
    .then((data) => {
      return data;
    })
    // .then(result => console.log(JSON.parse(result.text())))
    .catch((error) => console.log("error", error));
}

async function getTrack(token, id) {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`https://api.spotify.com/v1/tracks/${id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error", error));
}

module.exports= {
    getUser: getUser,
    getUserPlaylists : getUserPlaylists,
    getUserTopTracks : getUserTopTracks,
    getUserTopArtists : getUserTopArtists,
    getUserPlaylists : getUserPlaylists,
    addLikedSong : addLikedSong,
    checkIfLikedSong : checkIfLikedSong,
    deleteLikedSong : deleteLikedSong,
    getLikedSongs : getLikedSongs,
    getUserAlbums : getUserAlbums,
    getAlbum : getAlbum,
    getTrack
}