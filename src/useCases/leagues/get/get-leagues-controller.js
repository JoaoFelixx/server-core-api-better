const { Request, Response } = require('../../../config/RequestMethods');
const { getLeagues } = require('./get-leagues');

async function getLeagueController(request = Request, response = Response) {
  try {
    const { id } = request.params;

    const result = await getLeagues(id);

    if (!result)
      return response.sendStatus(200);

    response.json(result);

  } catch (error) {
    response.sendStatus(400);
  }
}

module.exports = { getLeagueController };