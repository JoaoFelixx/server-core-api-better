const { getUsersController, createUserController } = require('./useCases');
const { Response } = require('./config');
const routesAndControllers = {};
const Controller = () => { };

const Router = () => {
  return {
    get: (path, controller = Controller) => routesAndControllers[`GET:${path}`] = controller,
    put: (path, controller = Controller) => routesAndControllers[`PUT:${path}`] = controller,
    post: (path, controller = Controller) => routesAndControllers[`POST:${path}`] = controller,
    delete: (path, controller = Controller) => routesAndControllers[`DELETE:${path}`] = controller,
  }
}

const routes = Router();

routesAndControllers.default = (request, response = Response) => 
  response.status(404).json('Page not a found')

routes.get('/users', getUsersController);
routes.post('/users', createUserController);

module.exports = routesAndControllers;