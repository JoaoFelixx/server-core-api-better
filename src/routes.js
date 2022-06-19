const { DEFAULT_HEADER } = require('./config');
const { getAllUsers, createUserController } = require('./useCases');

const routeNotAFound = (request, response) =>
  response.writeHead(404, DEFAULT_HEADER)
    .end(JSON.stringify('PAGE NOT A FOUND'));

const routes = {
  '/:GET': getAllUsers,
  '/users:POST': createUserController,
  'default': routeNotAFound,
};

module.exports = routes;