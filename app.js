var express = require('express');
var bodyParser = require('body-parser');
var rateLimit = require('express-rate-limit');

var app = express();

/*
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
*/

var port = process.env.PORT || 3000;
// app.use(express.json());
// app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

var server = app.listen(port, function () {
  console.log('Listening on port %s...', server.address().port);
});

var routes = require('./ProjFiles/Services/routes.js')(app, server);
