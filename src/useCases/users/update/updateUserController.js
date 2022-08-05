const { updateUser } = require('./updateUser');
const { Request, Response } = require('../../../config/RequestMethods');

const formatMessage = (messages = ['']) =>
  messages.map((message) => message + ' is invalid').join(', ');

async function updateUserController(request = Request, response = Response) {
  try {
    const { id } = request.params;
    const { username, preferenceColorTheme } = request.body;

    const user = {
      _id: id,
      username: username.toLowerCase?.(),
      preferenceColorTheme,
    }

    const result = await updateUser(user);

    if (result instanceof Error)
      return response.status(400).json(result.message);

    if (Array.isArray(result))
      return response.status(400).json(formatMessage(result));

    response.status(202).json(user);

  } catch (error) {
    console.log(error)
    return response.sendStatus(400);
  }
}

module.exports = { updateUserController }