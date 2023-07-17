
var bodyParser = require('body-parser');
//var fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


/*
import * as fetch from 'node-fetch';
import * as bodyParser from 'body-parser';
*/

const appRouter = function (app, conn, server) {
  // parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  // app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.send('Hello World');
  });

  app.all('/proxy/*', async (req, res) => {
    try {
      console.log("Working 0");
      let body = JSON.parse(JSON.stringify(req.body));
      var cdr = "";
      //req.body.pipe(cdr);
      req.on('data', (chunk) => {
        cdr += chunk;
      });
      req.on('end', ()=>{
        console.log("workng req onj");
        console.log(JSON.parse(cdr));
      });
      //console.log(req);
      console.log(JSON.stringify(req.body));
      console.log("working 1");
      const { url } = req.query || body.url;
      if (!url) {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }
    console.log('working 2');
    let params = {};
    if(body.method !== null && body.method !== undefined){
      if(body.method === 'POST'){
      params = {
        method: body.method, 
        headers: { ...body.headers, }, 
        body: body.body
      }
      }
      else if(body.method === 'GET'){
        params = {
          method: body.method,
          headers: body.headers
        }
      }
      else{}
    }
    console.log(`${url}\n${JSON.stringify(params)}`);
    fetch(url, { ...params })
        .then((response) => {
          //res.writeHead(response.status, response.headers);
          //response.body.pipe(res);
        
         console.log("working 3");
        })
        .catch((error) => {
          console.error('Error', error);
          res.statusCode = 500;
          res.end('Internal Server Error');
        });
    } catch (ex) {
      console.error(ex);
      return res.status(500).json({ error: 'An error occurred' });
    }
  });

  

  app.get('/test/', async (req, res) => {
    try {
      const googleProductionDeploymentID = 'AKfycbyEfXxKDSAOgZXPRFvi1k7MTFEbD57VfwH1Ppxm11d28vc6i33W4KkUNof21S54L_1x';// 'AKfycby64Npo8TfLUUnq7cCAScD6mAo0Hl4QLjdx8_GCaanzE5fcZLML6CA0';
      const mainURL ='https://script.google.com/macros/s/'+googleProductionDeploymentID+'/exec';
      const PostGetAvailableMonthlyExpenseData ='?Contenttype=application/json&userRequest=getDatabyMonth';

      url=`${mainURL}${PostGetAvailableMonthlyExpenseData}`;
      const postData = {
        method: 'POST',
        body: {
          method_name: 'getDatabyMonth',
          service_request_data: {
            month: "July",
            year: "2023",
          },
        },
        headers: {
          Accept: '*/*',
          'Access-Control-Allow-Origin': '*',
          'Accept-Encoding': ['gzip', 'deflate', 'br'],
          Connection: 'keep-alive',
          'Content-Type': 'application/json',
        },
      };

      fetch(url, {
        method: 'POST',
        headers: {
          ...postData.headers
          /*
          Accept: '* /*',
          'Access-Control-Allow-Origin': '*',
          'Accept-Encoding': ['gzip', 'deflate', 'br'],
          Connection: 'keep-alive',
          */
          //'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData.body),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON.status_code === 200 || responseJSON.status_code === 201) {
            res.status(200).json({
              data: responseJSON.response_data,
              error: null,
              message: 'Proxy request successful and obtained data from server',
            });
          }
        })
        .catch((ex) => {
          console.error(ex);
          res.status(400).json({
            error: ex,
            message: 'Proxy request successful and this service has been failed',
          });
        });
    } catch (ex) {
      console.error(ex);
      return res.status(500).json({ 
          error: ex,
          message: "Server error"
      });
    }
  });


};
module.exports = appRouter;
//http://localhost:3000/account?username=nraboy
