const { Response } = require('./config');
const {
  getUsersController,
  createUserController,
  deleteUserController,
} = require('./useCases');

const routesAndControllers = {};

const Router = () => {
  return {
    get: (path, controller) => routesAndControllers[`GET:${path}`] = controller,
    put: (path, controller) => routesAndControllers[`PUT:${path}`] = controller,
    post: (path, controller) => routesAndControllers[`POST:${path}`] = controller,
    delete: (path, controller) => routesAndControllers[`DELETE:${path}`] = controller,
  }
}

const routes = Router();

routesAndControllers.default = (request, response = Response) =>
  response.sendStatus(404);

routes.get('/users', getUsersController);
routes.post('/users', createUserController);
routes.delete('/users', deleteUserController);

module.exports = { routes: routesAndControllers };