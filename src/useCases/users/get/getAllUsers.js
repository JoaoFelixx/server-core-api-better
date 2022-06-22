const { DEFAULT_HEADER } = require('../../../config');
const { Response } = require('../../../utils');

async function getAllUsers(request, response = Response) {
  try {
    response.status(200).json("OK");
  } catch (error) {
    response.sendStatus(400);
  }
}

module.exports = { getAllUsers };