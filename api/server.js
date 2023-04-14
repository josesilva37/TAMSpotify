const express = require('express');
const spotifyRoute = require('./routes/spotify')

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;


app.use(bodyParser.json());
app.use("/spotify",spotifyRoute )

app.get('/', (req,res) => {
    res.send('teste');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
