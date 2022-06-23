const { Response, Request } = require('../../../config');
const { getUsers } = require('./getUsers');

async function getUsersController(request = Request, response = Response) {
  try {
    const { id } = request.params;

    const users = await getUsers();

    response.status(200).json(users);

  } catch (error) {
    response.sendStatus(400);
  }
}

module.exports = { getUsersController };