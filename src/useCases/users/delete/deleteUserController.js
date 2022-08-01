const { Request, Response } = require('../../../config/RequestMethods');
const { deleteUser } = require('./deleteUser');

async function deleteUserController(request = Request, response = Response) {
  try {
    const { id } = request.params;

    if (!id)
      return response.status(400).json('ID is undefined');

    const result = await deleteUser(id)

    if (result instanceof Error)
      return response.status(400).json(result.message);

    return response.sendStatus(204);

  } catch (error) {
    return response.sendStatus(400);
  }
}

module.exports = { deleteUserController };