const { Request, Response } = require('../../../config/RequestMethods');
const { randomUUID: uuid } = require('crypto');
const { createUser } = require('./createUser');

const formatMessage = (messages = ['']) =>
  messages.map((message) => message + ' is invalid').join(', ');

async function createUserController(request = Request, response = Response) {
  try {
    const { username } = request.body;

    if (!username)
      throw new Error();

    const user = {
      _id: uuid(),
      username: username?.toLowerCase?.()
    }

    const result = await createUser(user);

    if (result instanceof Error)
      return response.status(400).json(result.message);

    if (Array.isArray(result))
      return response.status(400).json(formatMessage(result));

    return response.status(201).json(user);

  } catch (error) {
    response.sendStatus(400);
  }
}

module.exports = { createUserController };