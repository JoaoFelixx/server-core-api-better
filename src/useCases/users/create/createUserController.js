const { randomUUID: uuid } = require('crypto');
const { createUser } = require('./createUser');
const { Request, Response } = require('../../../config');

async function createUserController(request = Request, response = Response) {
  try {

    console.log(request.body);

    const { username } = request.body;

    if (!username)
      throw new Error()

    const user = {
      _id: uuid(),
      username: username.toLowerCase()
    }

    const result = await createUser(user);

    if (result instanceof Error)
      return response.status(400).json(result.message);

    return response.status(201).json(user);

  } catch (error) {
    response.sendStatus(400);
  }
}

module.exports = { createUserController };