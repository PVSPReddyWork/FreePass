const fetch = require('node-fetch');
const https = require('https');

const agent = new https.Agent({ rejectUnauthorized: false });

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer your-access-token'
};

fetch('https://target-server.com/api/data', { agent, headers })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Handle the response data
  })
  .catch(error => {
    console.error(error); // Handle any errors
  });