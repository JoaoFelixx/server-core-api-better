const { Response, Request } = require('../../../config');
const { getUsers } = require('./getUsers');

async function getUsersController(request = Request, response = Response) {
  try {
    const { id } = request.params;

    const users = await getUsers();

    response.json(users);

  } catch (error) {
    console.log(error)
    response.sendStatus(400);
  }
}

module.exports = { getUsersController };