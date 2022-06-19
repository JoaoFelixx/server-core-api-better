const http = require('http');
const { formatUrl } = require('./utils');
const routes = require('./routes');
const { DEFAULT_HEADER } = require('./config');

const server = http.createServer(async (request, response) => {
  try {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );

    const { url, method } = request;

    const urlFormatted = formatUrl(url, method);

    const route = routes[urlFormatted] || routes.default;

    route(request, response);
    
  } catch (error) {
    response.writeHead(500, DEFAULT_HEADER).end();
  }
});

module.exports = server;