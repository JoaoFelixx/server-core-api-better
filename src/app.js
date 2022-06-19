const http = require('http');
const { formatUrl } = require('./utils');
const routes = require('./routes');
const { DEFAULT_HEADER } = require('./config');

const server = http.createServer(async (request, response) => {
  try {
    const { url, method } = request;

    
    const urlFormatted = formatUrl(url, method);
    
    const route = routes[urlFormatted] || routes.default;
    
    //route(request, response)
    
    request.setTimeout(4000, () => response.writeHead(408).end())
  } catch (error) {
    response.writeHead(500, DEFAULT_HEADER).end();
  }
});

module.exports = server;