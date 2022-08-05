const { Request, Response } = require('../../../config/RequestMethods');
const { getUsers } = require('./getUsers');

async function getUsersController(request = Request, response = Response) {
  try {
    const { id } = request.params;

    const result = await getUsers(id);

    if (result instanceof Error) 
      return response.sendStatus(400);

    if (!result)
      return response.sendStatus(204);

    response.json(result);

  } catch (error) {
    response.sendStatus(400);
  }
}

module.exports = { getUsersController };