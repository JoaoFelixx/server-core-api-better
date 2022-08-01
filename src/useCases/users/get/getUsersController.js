const { Request, Response } = require('../../../config/RequestMethods');
const { getUsers } = require('./getUsers');

async function getUsersController(request = Request, response = Response) {
  try {
    const { id } = request.params;

    const users = await getUsers(id);

    if (!users)
      return response.sendStatus(200);

    response.json(users);

  } catch (error) {
    response.sendStatus(400);
  }
}

module.exports = { getUsersController };