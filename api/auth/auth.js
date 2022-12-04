 var request = require('request'); // "Request" library

 var client_id = 'f92874228c914496befc0619ade6f458'; // Your client id
 var client_secret = '4ab0506426c544009ea0d8920eeaa7d8'; // Your secret
 
 // your application requests authorization
 var authOptions = {
   url: 'https://accounts.spotify.com/api/token',
   headers: {
     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
   },
   form: {
     grant_type: 'client_credentials'
   },
   json: true
 };
 function authRequest(){
   var token
     request.post(authOptions, function(error, response, body) {
       if (!error && response.statusCode === 200) {
     
         // use the access token to access the Spotify Web API
         token = body.access_token;
         console.log(token)
        //  var options = {
        //    url: 'https://api.spotify.com/v1/users/jmperezperez',
        //    headers: {
        //      'Authorization': 'Bearer ' + token
        //    },
        //    json: true
        //  };
        //  request.get(options, function(error, response, body) {
        //    console.log(token);
        //  });
      }
    });
 }
 

 module.exports = {
    authRequest
 }