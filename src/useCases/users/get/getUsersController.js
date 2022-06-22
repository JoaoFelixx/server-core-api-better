const { Response } = require('../../../utils');
const { getUsers } = require('./getUsers');

async function getUsersController(request, response = Response) {
  try {
    const users = await getUsers();

    response.status(200).json(users);

  } catch (error) {
    response.sendStatus(400);
  }
}

module.exports = { getUsersController };