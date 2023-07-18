var bodyParser = require('body-parser');
//const { response } = require('express');
//var fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

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
      var _body = '';

      req.on('data', (chunk) => {
        _body += chunk;
      });

      req.on('end', () => {
        try{
        const body = JSON.parse(_body);
        //console.log(body);
        const { url } = req.query || body.url;
        if (!url) {
          return res.status(400).json({ error: 'Missing URL parameter' });
        }

        let params = {};
        if (body.method !== null && body.method !== undefined) {
          if (body.method === 'POST') {
            params = {
              method: body.method,
              headers: { ...body.headers },
              body: JSON.stringify(body.body),
            };
          } else if (body.method === 'GET') {
            params = {
              method: body.method,
              headers: body.headers,
            };
          } else {
          }
        }

        //console.log(`${url}\n${JSON.stringify(params)}`);
        //console.log(JSON.stringify(params));
        fetch(url, { ...params })
          .then((response) => {
            //return response.text();
            ///console.log(eref);
            res.writeHead(response.status, response.headers);
            response.body.pipe(res);
            //return response.text();
          })
          /*
          .then((textres) =>{
            console.log(textres);
            res.send(textres);
          })*/
          .catch((error) => {
            console.error('Error', error);
            res.statusCode = 500;
            res.end('Internal Server Error');
          });
        }catch(ex){
      console.error(ex);
      return res.status(500).json({ error: 'An error occurred' });
        }
      });
    } catch (ex) {
      console.error(ex);
      return res.status(500).json({ error: 'An error occurred' });
    }
  });

  /*
  app.all('/proxy/*', async (req, res) => {
    try {
      let body = JSON.parse(JSON.stringify(req.body));
      console.log("working 1");
      const { url } = req.query || body.url;
      if (!url) {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }
    /*
    var _response = await fetch(url, {method: body.method, headers: body.headers, body: body.body});
    res.status(201).json({
      message: "",
      data: _response.json(),
      error: null
    });
    * /
    console.log('working 2');
    //let body = JSON.parse(JSON.stringify(body));
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
     /*
    var proxyRes = await fetch(url, {...params});
    //res.writeHead(proxyRes.status, proxyRes.headers);
    proxyRes.on('data', (chunk)=>{
      res.write(chunk);
    });
    proxyRes.on('end', ()=>{
      res.end();
    });
    */
  /** /
    fetch(url, { ...params })
        .then((response) => {
          /*
          response.on('data', (chunk) => {
            console.log("working 4");
            res.write(chunk);//forward data to client
          });
          response.on('end', () =>{
            console.log('working 5');
            res.end();//end data stream
          });/** /
          /** /
          res.writeHead(response.status, response.headers);
          response.body.pipe(res);
          //res.send(response);
          /** /
         console.log("working 3");
         //res.status(201).json({resp: response});
          //return response.json();/
        })/** /
        .then((responseJSON) => {
          console.log("Working 4");
          console.log(responseJSON);
          res.status(200).json({
              data: responseJSON,
              error: null,
              message: 'Proxy request successful and obtained data from server',
            });
            /** /
          if (responseJSON.status_code === 200 || responseJSON.status_code === 201) {
            console.log("working 5");
            res.status(200).json({
              data: responseJSON.response_data,
              error: null,
              message: 'Proxy request successful and obtained data from server',
            });
            
            console.log("working 7");
          }
          /** /
        })/** /
        .catch((error) => {
          console.error('Error', error);
          res.statusCode = 500;
          res.end('Internal Server Error');
        });
        /**/

  /*
    let _body = '';
      console.log(`${url}\n${JSON.stringify(body)}`);
    req.on('data', (chunk) => {
      console.log(`started ${chunk}`);
      _body += chunk;
    });
    req.on('end', async()=>{
      console.log(`${url}\n${JSON.stringify(_body)}`);
      const _response = await fetch(url, {method: _body.method, headers: {..._body.headers}, body: _body.body})
      /*
       const _response = await fetch(url, { 
        method: req.method, 
        headers: {
          ...req.headers,
          "origin": "https://freepass.cyclic.app/",
          "referer": "https://freepass.cyclic.app/",
        }, 
        body: body })
        .then((response) => {
          res.writeHead(response.status, response.headers);
          response.body.pipe(res);
          res.send(response);
          //return response.json();
        })/*.then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON.status_code === 200 || responseJSON.status_code === 201) {
            res.status(200).json({
              data: responseJSON.response_data,
              error: null,
              message: 'Proxy request successful and obtained data from server',
            });
          }
        })* /
        .catch((error) => {
          console.error('Error', error);
          res.statusCode = 500;
          res.end('Internal Server Error');
        });
        * /
      console.log(_response);
    });
    */
  /*
      res.json({
        message: 'Proxy request successful and this is a sample response',
      });
      * /
    } catch (ex) {
      console.error(ex);
      return res.status(500).json({ error: 'An error occurred' });
    }
  });
  */

  app.get('/test/', async (req, res) => {
    try {
      const googleProductionDeploymentID = 'AKfycbyiAY44kux44qB-Vn-I_xuJ8sDEq0LFjWrw8m5NYrcUE3tdKT-qajG-Ul45Yo1CfsDc';//'AKfycbyEfXxKDSAOgZXPRFvi1k7MTFEbD57VfwH1Ppxm11d28vc6i33W4KkUNof21S54L_1x'; // 'AKfycby64Npo8TfLUUnq7cCAScD6mAo0Hl4QLjdx8_GCaanzE5fcZLML6CA0';
      const mainURL =
        'https://script.google.com/macros/s/' +
        googleProductionDeploymentID +
        '/exec';
      const PostGetAvailableMonthlyExpenseData =
        '?Contenttype=application/json&userRequest=getDatabyMonth';

      url = `${mainURL}${PostGetAvailableMonthlyExpenseData}`;
      const postData = {
        method: 'POST',
        body: {
          method_name: 'getDatabyMonth',
          service_request_data: {
            month: 'July',
            year: '2023',
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
          ...postData.headers,
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
          if (
            responseJSON.status_code === 200 ||
            responseJSON.status_code === 201
          ) {
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
            message:
              'Proxy request successful and this service has been failed',
          });
        });
    } catch (ex) {
      console.error(ex);
      return res.status(500).json({
        error: ex,
        message: 'Server error',
      });
    }
  });
};
module.exports = appRouter;
//http://localhost:3000/account?username=nraboy
