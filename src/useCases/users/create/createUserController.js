const { DEFAULT_HEADER } = require("../../../config");
const { randomUUID: uuid } = require('crypto')

async function createUserController(request, response) {
  try {
    request.on('data', (body) => {
      const { username } = JSON.parse(body)

      console.log(username)

      if (!username)
        return response.writeHead(400, DEFAULT_HEADER).end();

      const user = {
        _id: uuid(),
        username: username.toLowerCase()
      }

      console.log(user);

      return response.writeHead(201, DEFAULT_HEADER)
        .end(JSON.stringify('User created'));
    });

    throw new Error()
  } catch (error) {
    response.writeHead(400).end();
  }
}

module.exports = { createUserController };