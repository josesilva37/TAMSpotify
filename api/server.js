const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data
const users = [];
var auth = require('./auth/auth')
const redirectUri = 'http://localhost:8888/callback';

app.use(bodyParser.json());

app.get('/auth', (req,res) => {
    res.send(auth.authRequest());
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
