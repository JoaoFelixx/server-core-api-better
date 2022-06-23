const http2 = require('http2');
const fs = require('fs');
const routes = require('./routes');
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
      const [, route, id] = url.split('/');
      
      request.params = { id };
      
      const urlFormatted = `${method.toUpperCase()}:/${route.toLowerCase()}`;

      const routeSelected = routes[urlFormatted] || routes.default;

      await routeSelected(request, response);

      request.setTimeout(4000, () => response.status(408).json('Request timeout exceeded'))

    } catch (error) {
      response.sendStatus(500);
    }
  })
  .on('error', (error) => console.log(error))

module.exports = secureServer;