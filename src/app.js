const http2 = require('http2');
const fs = require('fs');
const { routes } = require('./routes');
const { DEFAULT_HEADER } = require('./config/DefaultHeader');

const sslSettings = {
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
}

const statusEnd = {
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '204': 'Not Content',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not a Found',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '500': 'Internal Server Error',
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

      response.sendStatus = (status) =>
        response.writeHead(status, DEFAULT_HEADER).end(JSON.stringify(statusEnd[status]));
      response.json = (data) => response.writeHead(200, DEFAULT_HEADER).end(JSON.stringify(data))
      response.status = (status) => {
        response.writeHead(status, DEFAULT_HEADER);
        return {
          json: (data) => response.end(JSON.stringify(data))
        }
      };
      const { url, method } = request;
      const [, route, id] = url.split('/');

      request.params = { id };

      if (method === 'POST' || method === 'PUT') {
        for await (let data of request)
          request.body = JSON.parse(data)
      }

      const urlFormatted = `${method.toUpperCase()}:/${route.toLowerCase()}`;

      const routeSelected = routes[urlFormatted] || routes.default;

      await routeSelected(request, response);

      request.setTimeout(4000, () => response.sendStatus(408));

    } catch (error) {
      response.sendStatus(500);
    }
  })

module.exports = { server: secureServer };