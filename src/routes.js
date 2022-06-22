const { getUsersController, createUserController } = require('./useCases');
const { Response } = require('./utils');
const routesAndControllers = {};
const Controller = () => { };

const RouteMethods = () => {
  return {
    get: (path, controller = Controller) => routesAndControllers[`GET:${path}`] = controller,
    put: (path, controller = Controller) => routesAndControllers[`PUT:${path}`] = controller,
    post: (path, controller = Controller) => routesAndControllers[`POST:${path}`] = controller,
    delete: (path, controller = Controller) => routesAndControllers[`DELETE:${path}`] = controller,
  }
}

const routes = RouteMethods();

routesAndControllers.default = (request, response = Response) => response.status(404).json('Page not a found')

routes.get('/users', getUsersController);
routes.post('/users', createUserController);

module.exports = routesAndControllers;