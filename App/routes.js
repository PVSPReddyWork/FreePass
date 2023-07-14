/*
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
*/

import * as fetch from 'node-fetch';
import * as bodyParser from 'body-parser';

export const appRouter = function (app, conn, server) {
  // parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  // app.use(bodyParser.json())

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
};
//module.exports = appRouter;
//http://localhost:3000/account?username=nraboy
