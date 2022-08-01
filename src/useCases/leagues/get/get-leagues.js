const { JDB } = require('../../../JDB/index');
const { create, find } = require('../../../cache/myRedis');

async function getLeagues(_id) {
  const data = find(_id || 'leagues');

  if (data)
    return data;

  const leagues = new JDB({ model: 'leagues' });

  const result = await leagues.get();

  if (!_id) {
    create('leagues', result);
    return result
  }

  const league = result.find(({ id }) => id === _id);

  return league || null;
}

module.exports = { getLeagues };