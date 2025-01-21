var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
var aylien = require("aylien_textapi");
dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

var textapi = new aylien({
    application_id:process.env.API_ID,
    application_key:process.env.API_KEY
  });

app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
});

app.post('/api', function (req, res) {
    const { url } = req.body;
  
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    textapi.sentiment({
      url: url,
    }, function (error, response) {
      if (error) {
        return res.status(500).json({ error: 'Error occurred' });
      }
      res.json({
        analysis: response,
      });
    });
  });

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


