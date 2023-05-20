async function getUser() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  console.log("http://localhost:3080/spotify/User/" + window.localStorage.getItem('spotifyAuthToken'))
  fetch("http://localhost:3080/spotify/User/" + window.localStorage.getItem('spotifyAuthToken'), requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

module.exports = {
  getUser: getUser
}