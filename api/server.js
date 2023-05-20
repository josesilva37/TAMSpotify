const express = require('express');
const spotifyRoute = require('./routes/spotify')
const swaggerUi = require('swagger-ui-express');
const fs = require('fs')
const jsyaml = require('js-yaml')
const spec = fs.readFileSync('swagger.yaml', 'utf-8')
swaggerDocument = jsyaml.load(spec)

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use("/spotify",spotifyRoute )
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req,res) => {
    res.send('teste');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
