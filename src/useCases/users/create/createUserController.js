const { randomUUID: uuid } = require('crypto');
const { createUser } = require('./createUser');
const { DEFAULT_HEADER } = require('../../../config');

async function createUserController(request, response) {
  try {
    request.on('data', async (body) => {
      const { username } = JSON.parse(body)

      if (!username) 
        throw new Error()
      
      const user = {
        _id: uuid(),
        username: username.toLowerCase()
      }

      const result = await createUser(user); 

      if (result instanceof Error)
        return response.writeHead(400).end(JSON.stringify(result.message));

      return response.writeHead(201, DEFAULT_HEADER)
        .end(JSON.stringify('User created'));
    });
  } catch (error) {
    response.writeHead(400, DEFAULT_HEADER).end();
  }
}

module.exports = { createUserController };