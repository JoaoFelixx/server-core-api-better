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
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
      );
      response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      response.setHeader('Access-Control-Allow-Credentials', true);

      response.sendStatus = (status) => response.writeHead(status, DEFAULT_HEADER).end();
      response.json = (data) => response.writeHead(200, DEFAULT_HEADER).end(JSON.stringify(data))
      response.status = (status) => {
        response.writeHead(status, DEFAULT_HEADER)

        return {
          json: (data) => response.end(JSON.stringify(data))
        }
      };
      const { url, method } = request;
      const [, route, id] = url.split('/');

      request.params = { id };

      if (method === 'POST' || method === 'PUT') {
        for await (data of request)
          request.body = JSON.parse(data)
      }

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