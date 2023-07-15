var express = require('express');
var bodyParser = require('body-parser');
var rateLimit = require('express-rate-limit');
var cors = require('cors');
//var fetch = require('node-fetch');
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


/*
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
*/

var app = express();

/*
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
*/

var port = process.env.PORT || 3010;
// app.use(express.json());
// app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/*
Applying cors manually not worked
//Enable CORS headers
app.use((req, res, next) => {
  //Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  //Allow specfic HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  //Allow specific headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  //Allow sending cookies in cross-origin requests
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  //Continue to the next middleware or route
  next();
});
*/

/*
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
*/

//use the below only if app is needed security to restrict users
/*
const limiter = rateLimit({
  windowMs: 15*60*1000,//15 minutes
  max: 100//Max requests per IP with in the time window
});

//Whitelist of trusted IP addresses
const whitelist = ['127.0.0.1', '192.168.0.1'];

//custom middleware to endorce IP whitelisting
const enforceWhitelist = (req, res, next) => {
  const clientIP = req.ip;
  if(whitelist.includes(clientIP)){
    next();
  }else{
    res.status(403).json({error: 'Forbidden'});
  }
};

app.use(limiter);
app.use(enforceWhitelist);
*/

/*
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.all('/proxy/*', async (req, res) => {
  const { url } = req.query || req.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    fetch(url, { method: req.method, headers: req.headers, body: req.body })
      .then((response) => {
        res.writeHead(response.status, response.headers);
        response.body.pipe(res);
      })
      .catch((error) => {
        console.error('Error', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
    res.json({
      message: 'Proxy request successful and this is a sample response',
    });
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ error: 'An error occurred' });
  }
});
*/

/*
var server = app.listen(port, function () {
  console.log('Listening on port %s...', server.address().port);
});
*/
const server = app.listen(port, () => {
  console.log('Listening on port %s...', server.address().port);
});

var routes = require('./App/routes.js')(app, server);
