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

      const { url, method } = request;

      const urlFormatted = formatUrl(url, method);

      const route = routes[urlFormatted] || routes.default;

      await route(request, response);

    } catch (error) {
      response.writeHead(500, DEFAULT_HEADER).end();
    }
  })
  .on('error', (error) => console.log(error))

module.exports = secureServer;