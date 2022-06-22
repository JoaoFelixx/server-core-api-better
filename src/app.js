const http2 = require('http2');
const fs = require('fs');
const routes = require('./routes');
const { formatUrl } = require('./utils');
const { DEFAULT_HEADER } = require('./config');

const sslSettings = {
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
}

const secureServer = http2.createSecureServer(sslSettings)
  .on('request', async (request, response) => {
    try {
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
      );
      
      response.sendStatus = (status) => response.writeHead(status, DEFAULT_HEADER).end();
      response.status = (status) => { 
        response.writeHead(status, DEFAULT_HEADER)
        
        return {
          json: response.json = (data) => response.end(JSON.stringify(data))
        } 
      }; 

      const { url, method } = request;

      const urlFormatted = formatUrl(url, method);

      const route = routes[urlFormatted] || routes.default;

      await route(request, response);

      request.setTimeout(4000, () => response.status(408).json('Timeout'))

    } catch (error) {
      response.writeHead(500, DEFAULT_HEADER).end();
    }
  })
  .on('error', (error) => console.log(error))

module.exports = secureServer;