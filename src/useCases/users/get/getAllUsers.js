const { DEFAULT_HEADER } = require('../../../config');

async function getAllUsers(request, response) {
  try {
    response.writeHead(200, DEFAULT_HEADER)
      .end(JSON.stringify('OK'));
  } catch (error) {
    response.writeHead(400, DEFAULT_HEADER).end();
  }
}

module.exports = { getAllUsers };