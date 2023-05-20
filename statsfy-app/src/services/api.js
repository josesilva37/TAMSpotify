async function getUser() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch("http://localhost:3080/spotify/User/" + window.localStorage.getItem('spotifyAuthToken'), requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
module.exports = {
  getUser: getUser
}